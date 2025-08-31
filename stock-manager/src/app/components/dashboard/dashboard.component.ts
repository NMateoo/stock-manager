import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalProducts: number = 0;
  totalStock: number = 0;
  totalValue: number = 0;
  lowStockProducts: Product[] = [];
  recentProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.productService.getProducts().subscribe(products => {
      this.totalProducts = this.productService.getTotalProducts();
      this.totalStock = this.productService.getTotalStock();
      this.totalValue = this.productService.getTotalValue();
      this.lowStockProducts = this.productService.getLowStockProducts(10);
      this.recentProducts = products
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  }
} 