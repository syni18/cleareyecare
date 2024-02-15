// src/redux/store.js
import { createStore, combineReducers } from "redux";
import cartReducer from "./reducer/cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
