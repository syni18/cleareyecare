// watchlistActions.js
import {
  addToWatchlistApi,
  fetchWatchlistItem,
  removeFromWatchlistApi,
  fetchProductsById,
} from "../../helper/helper";


export const addToWatchlist = (productId) => async (dispatch) => {
  try {
    const response = await addToWatchlistApi(productId);
    dispatch({ type: "ADD_TO_WATCHLIST", payload: response });
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    // Handle error or dispatch an error action
  }
};

export const removeFromWatchlistAction = (productId) => async (dispatch) => {
  try {
    // console.log("productId: ", productId);
    const response = await removeFromWatchlistApi(productId);
    dispatch({ type: "REMOVE_FROM_WATCHLIST", payload: response });
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    // Handle error or dispatch an error action
  }
};

export const fetchWatchlist = () => async (dispatch) => {
  dispatch({ type: "FETCH_WATCHLIST_REQUEST" });

  try {
    const response = await fetchWatchlistItem(); // Assuming this is your endpoint to fetch watchlist items
    console.log(response);
    const watchlistIds = response.data.watchlist.map((item) => item._id);
    const products = await Promise.all(watchlistIds.map((id) => fetchProductsById(id)));
    console.log(products);

    dispatch({
      type: "FETCH_WATCHLIST_SUCCESS",
      payload: products,
    });
  } catch (error) {
    console.log(error);

    dispatch({
      type: "FETCH_WATCHLIST_FAILURE",
      payload: error.message,
    });
  }
};
