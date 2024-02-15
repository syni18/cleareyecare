// src/redux/reducers/cartReducer.js
const initialState = {
  cartCount: 0,
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartCount: state.cartCount + 1,
        cartItems: [...state.cartItems, action.payload],
      };
      case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
