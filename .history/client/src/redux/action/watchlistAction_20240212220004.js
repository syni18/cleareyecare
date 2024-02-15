// src/redux/actions/watchlistActions.js
export const addToWatchlist = (product) => {
  return {
    type: "ADD_TO_WATCHLIST",
    payload: product,
  };
};

export const removeFromWatchlist = (productId) => {
  return {
    type: "REMOVE_FROM_WATCHLIST",
    payload: productId,
  };
};
