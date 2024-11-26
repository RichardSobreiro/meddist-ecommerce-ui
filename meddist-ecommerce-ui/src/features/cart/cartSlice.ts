/** @format */

// features/cart/cartSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import {
//   addToCartAPI,
//   removeFromCartAPI,
//   clearCartAPI,
// } from "../../services/cartAPI";
import { CartItem } from "@/interfaces/CartItem";
import { Product } from "@/interfaces/Product";

interface CartState {
  items: CartItem[];
  totalItems: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  status: "idle",
  error: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product: Product, { dispatch }) => {
    //const response = await addToCartAPI(product);
    dispatch(addItem({ ...product, quantity: 1 })); // Simulate adding item before server response
    //return response.data;
    return { ...product, quantity: 1 };
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId: string, { dispatch }) => {
    //await removeFromCartAPI(productId);
    dispatch(removeItem(productId));
    return productId; // Make sure to return the productId upon successful API call
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { dispatch }) => {
    //await clearCartAPI();
    dispatch(clearItems());
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
        state.totalItems += 1;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items[index].quantity -= 1;
        if (state.items[index].quantity === 0) {
          if (state.totalItems > 0) {
            state.totalItems -= 1;
          }
          state.items.splice(index, 1);
        }
      } else {
        if (state.totalItems > 0) {
          state.totalItems -= 1;
        }
      }
    },
    clearItems(state) {
      state.items = [];
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    // Handling asynchronous operations' states if necessary
    builder
      .addCase(
        addToCart.fulfilled,
        (state, action: PayloadAction<CartItem>) => {
          // Check if the item is already in the cart
          //   const existingItem = state.items.find(
          //     (item) => item.id === action.payload.id
          //   );
          //   if (existingItem) {
          //     existingItem.quantity += action.payload.quantity; // Adjust based on server's response
          //   } else {
          //     state.items.push(action.payload); // Or push a new item
          //     state.totalItems += action.payload.quantity; // Update the total items count
          //   }
          state.status = "succeeded";
        }
      )
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<string>) => {
          //   const index = state.items.findIndex(
          //     (item) => item.id === action.payload
          //   );
          //   if (index !== -1) {
          //     state.totalItems -= state.items[index].quantity;
          //     state.items.splice(index, 1);
          //   }
          state.status = "succeeded";
        }
      )
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
        state.status = "succeeded";
      });
  },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
