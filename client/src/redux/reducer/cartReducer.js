// src/redux/reducers/cartReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].quantity +=
          action.payload.quantity || 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      state.cartCount += action.payload.quantity || 1;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex >= 0) {
        const item = state.cartItems[itemIndex];
        state.cartCount -= item.quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
