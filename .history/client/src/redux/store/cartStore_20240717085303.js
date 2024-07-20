// src/stores/cartStore.js
import {createWithEqualityFn} from "zustand/traditional";

const useCartStore = createWithEqualityFn((set) => ({
  cartCount: 0,
  cartItems: [],

  addToCart: (item) =>
    console.log(item)
    // set((state) => {
    //   const existingItemIndex = state.cartItems.findIndex(
    //     (cartItem) => cartItem._id === item._id
    //   );

    //   if (existingItemIndex >= 0) {
    //     const newCartItems = [...state.cartItems];
    //     newCartItems[existingItemIndex].quantity += item.quantity || 1;

    //     return {
    //       cartItems: newCartItems,
    //       cartCount: state.cartCount + (item.quantity || 1),
    //     };
    //   } else {
    //     return {
    //       cartItems: [
    //         ...state.cartItems,
    //         { ...item, quantity: item.quantity || 1 },
    //       ],
    //       cartCount: state.cartCount + (item.quantity || 1),
    //     };
    //   }
    // }),
  removeFromCart: (itemId) =>
    set((state) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === itemId
      );
      if (itemIndex >= 0) {
        const item = state.cartItems[itemIndex];
        const newCartItems = state.cartItems.filter(
          (item) => item._id !== itemId
        );

        return {
          cartItems: newCartItems,
          cartCount: state.cartCount - item.quantity,
        };
      }
      return state;
    }),

  increaseQuantity: (itemId) =>
    set((state) => {
      const item = state.cartItems.find((item) => item._id === itemId);
      if (item) {
        item.quantity += 1;
        return {
          cartItems: [...state.cartItems],
        };
      }
      return state;
    }),

  decreaseQuantity: (itemId) =>
    set((state) => {
      const item = state.cartItems.find((item) => item._id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        return {
          cartItems: [...state.cartItems],
        };
      }
      return state;
    }),
}));

export default useCartStore;
