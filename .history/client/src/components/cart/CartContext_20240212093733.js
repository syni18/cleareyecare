import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const cartValue = cartItems.length; // Or calculate the total number of items differently if needed

  return (
    <CartContext.Provider value={{ cartItems, addToCart, cartValue }}>
      {children}
    </CartContext.Provider>
  );
};
