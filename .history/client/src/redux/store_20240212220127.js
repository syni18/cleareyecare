// src/redux/store.js
import { createStore, combineReducers } from "redux";
import cartReducer from "./reducer/cartReducer";
import watchlistReducer from "./reducer/watchlistReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  watchlist: watchlistReducer,
});


const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
