import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export const useCartStore = createWithEqualityFn(
  devtools((set) => ({
    cartItems: [],
    cartCount: 0,

    // set all cart items
    setCartItems: (items) =>
      set(() => ({
        cartItems: Array.isArray(items) ? [...items] : [],
        cartCount: items.length,
      })),

      //add new item to the cart
      addToCart: (item) => 
        set((state) => {
          // Ensure no duplicates in the array
          const updatedCartItems = state.cartItems.includes(item._id)
           ? state.cartItems
            : [...state.cartItems, item._id];
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),
      
      // remove item from the cart
      removeFromCart: (item) => 
        set((state) => {
          const updatedCartItems = state.cartItems.filter(
            (cartItem) => cartItem.productI._id!== item._id
          );
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),
      // increment item quantity in the cart
      increaseQuantity: (id) => 
        set((state) => {
          console.log("id", id);
          
          const updatedCartItems = state.cartItems.map((cartItem) => {
            if (cartItem.productId._id === id) {
              return {...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
          })
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),
      
      // decrement item quantity in the cart
      decreaseQuantity: (id) =>
        set((state) => {
          const updatedCartItems = state.cartItems.map((cartItem) => {
            if (cartItem.productId._id === id && cartItem.quantity > 1) {
              return {...cartItem, quantity: cartItem.quantity - 1 };
            }
            return cartItem;
          });
          return {
            cartItems: updatedCartItems,
            cartCount: updatedCartItems.length,
          };
        }),
  }))
);

export default useCartStore;
