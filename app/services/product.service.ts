import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductFormData, StockUpdate } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Camiseta Básica',
      size: 'M',
      price: 25.99,
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Camiseta Deportiva',
      size: 'L',
      price: 35.99,
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      name: 'Camiseta Vintage',
      size: 'S',
      price: 29.99,
      stock: 25,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor() { }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(productData: ProductFormData): void {
    const newProduct: Product = {
      ...productData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);
  }

  updateProduct(id: string, productData: Partial<ProductFormData>): void {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = {
        ...this.products[index],
        ...productData,
        updatedAt: new Date()
      };
      this.productsSubject.next([...this.products]);
    }
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter(product => product.id !== id);
    this.productsSubject.next([...this.products]);
  }

  updateStock(stockUpdate: StockUpdate): void {
    const product = this.products.find(p => p.id === stockUpdate.productId);
    if (product) {
      if (stockUpdate.operation === 'add') {
        product.stock += stockUpdate.quantity;
      } else {
        product.stock = Math.max(0, product.stock - stockUpdate.quantity);
      }
      product.updatedAt = new Date();
      this.productsSubject.next([...this.products]);
    }
  }

  getLowStockProducts(threshold: number = 10): Product[] {
    return this.products.filter(product => product.stock <= threshold);
  }

  getTotalProducts(): number {
    return this.products.length;
  }

  getTotalStock(): number {
    return this.products.reduce((total, product) => total + product.stock, 0);
  }

  getTotalValue(): number {
    return this.products.reduce((total, product) => total + (product.price * product.stock), 0);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
} 