/** @format */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
}

export interface PaginationProps {
  products: Product[];
  page: number;
  total: number;
}
