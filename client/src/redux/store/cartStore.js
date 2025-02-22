import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export const useCartStore = createWithEqualityFn(
  devtools(
    (set) => ({
      cartItems: [],
      cartCount: 0,

      setCartItems: (items) =>
        set(() => ({
          cartItems: Array.isArray(items) ? [...items] : [],
          cartCount: items.length,
        })),

      addToCart: (item) =>
        set((state) => {
          const updatedCartItems = state.cartItems.some(
            (cartItem) => cartItem.productId._id === item._id
          )
            ? state.cartItems
            : [...state.cartItems, { productId: item, quantity: 1 }];
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),

      removeFromCart: (item) =>
        set((state) => {
          const updatedCartItems = state.cartItems.filter(
            (cartItem) => cartItem.productId._id !== item.productId._id
          );
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),

      increaseQuantity: (id) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((cartItem) => {
            if (cartItem.productId._id === id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
          });
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),

      decreaseQuantity: (id) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((cartItem) => {
            if (cartItem.productId._id === id && cartItem.quantity > 1) {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          });
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),
    }),
    { name: "CartStore" } // <-- Add a name to the devtools
  )
);

export default useCartStore;