import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductFormData } from '../../models/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: ProductFormData = {
    name: '',
    size: '',
    price: 0,
    stock: 0
  };

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  constructor(private productService: ProductService) {}

  onSubmit(): void {
    if (this.validateForm()) {
      this.productService.addProduct(this.product);
      this.resetForm();
      alert('Producto agregado exitosamente');
    }
  }

  validateForm(): boolean {
    if (!this.product.name || !this.product.size || this.product.price <= 0 || this.product.stock < 0) {
      alert('Por favor completa todos los campos obligatorios correctamente');
      return false;
    }
    return true;
  }

  resetForm(): void {
    this.product = {
      name: '',
      size: '',
      price: 0,
      stock: 0
    };
  }
} 