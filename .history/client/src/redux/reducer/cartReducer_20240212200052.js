// src/redux/reducers/cartReducer.js
const initialState = {
  cartCount: 0,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      // Check if the item is already in the cart
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update the quantity
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              quantity: item.quantity + (action.payload.quantity || 1), // Increment the quantity
            };
          }
          return item;
        });

        return {
          ...state,
          cartCount: state.cartCount + (action.payload.quantity || 1),
          cartItems: updatedCartItems,
        };
      } else {
        // Item does not exist, add to cart
        return {
          ...state,
          cartCount: state.cartCount + (action.payload.quantity || 1),
          cartItems: [...state.cartItems, action.payload],
        };
      }
    }
    case "REMOVE_FROM_CART": {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      const item = state.cartItems[itemIndex];

      const updatedCartItems = state.cartItems.filter(
        (_, index) => index !== itemIndex
      );

      return {
        ...state,
        cartCount: state.cartCount - (item ? item.quantity : 0),
        cartItems: updatedCartItems,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
