// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducer/cartReducer';
// import watchlistReducer from './reducer/watchlistReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    watchlist: watchlistReducer,
  },
});

export default store;
