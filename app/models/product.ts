export interface Product {
  id: string;
  name: string;
  size: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  size: string;
  price: number;
  stock: number;
}

export interface StockUpdate {
  productId: string;
  quantity: number;
  operation: 'add' | 'subtract';
} 