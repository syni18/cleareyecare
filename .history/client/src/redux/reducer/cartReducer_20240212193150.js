// src/redux/reducers/cartReducer.js
const initialState = {
  cartCount: 0,
  cart
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartCount: state.cartCount + 1,
      };
    default:
      return state;
  }
};

export default cartReducer;
