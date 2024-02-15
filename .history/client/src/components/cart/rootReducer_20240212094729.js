import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // Ensure this path is correct

const rootReducer = combineReducers({
  cart: cartReducer, // This key 'cart' is what you access in state.cart
  // other reducers...
});

export default rootReducer;
