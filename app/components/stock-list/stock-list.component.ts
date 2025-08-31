import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, StockUpdate } from '../../models/product';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  showStockModal: boolean = false;
  selectedProduct: Product | null = null;
  stockQuantity: number = 1;
  stockOperation: 'add' | 'subtract' = 'add';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesSearch;
    });
  }

  openStockModal(product: Product): void {
    this.selectedProduct = product;
    this.stockQuantity = 1;
    this.stockOperation = 'add';
    this.showStockModal = true;
  }

  closeStockModal(): void {
    this.showStockModal = false;
    this.selectedProduct = null;
  }

  updateStock(): void {
    if (this.selectedProduct && this.stockQuantity > 0) {
      const stockUpdate: StockUpdate = {
        productId: this.selectedProduct.id,
        quantity: this.stockQuantity,
        operation: this.stockOperation
      };
      
      this.productService.updateStock(stockUpdate);
      this.closeStockModal();
    }
  }

  deleteProduct(product: Product): void {
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
      this.productService.deleteProduct(product.id);
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }

  getStockStatus(stock: number): { class: string, text: string } {
    if (stock === 0) {
      return { class: 'bg-red-100 text-red-800', text: 'Sin stock' };
    } else if (stock <= 10) {
      return { class: 'bg-yellow-100 text-yellow-800', text: 'Bajo stock' };
    } else {
      return { class: 'bg-green-100 text-green-800', text: 'En stock' };
    }
  }
} 