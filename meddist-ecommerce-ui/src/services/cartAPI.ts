/** @format */

import axios from "axios";
import { Product } from "../interfaces/Product";

export const addToCartAPI = async (product: Product) => {
  return axios.post("/api/cart", { product });
};

export const removeFromCartAPI = async (productId: string) => {
  return axios.delete(`/api/cart/${productId}`);
};

export const clearCartAPI = async () => {
  return axios.delete("/api/cart");
};
