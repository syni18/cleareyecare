// Action Types
const ADD_TO_CART = "ADD_TO_CART";

// Initial state
const initialState = {
  items: "",
};

// Reducer
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

// Action Creators
export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export default cartReducer;
