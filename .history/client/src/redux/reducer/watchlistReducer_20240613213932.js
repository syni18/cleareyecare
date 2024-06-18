// src/redux/reducers/watchlistReducer.js

const initialState = {
  watchlistItems: [],
  loading: false,
  error: null,
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      // Prevent duplicates
      const existItem = state.watchlistItems.find(
        (item) => item._id === action.payload._id
      );
      if (existItem) {
        return state;
      }
      return {
        ...state,
        watchlistItems: [...state.watchlistItems, action.payload],
      };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlistItems: state.watchlistItems.filter(
          (item) => item._id !== action.payload
        ),
      };
    case "FETCH_WATCHLIST_REQUEST":
      return {
        ...state,
        loading: true,
        error: null, // Reset error state on request
      };
    case "FETCH_WATCHLIST_SUCCESS":
      cons
      return {
        ...state,
        loading: false,
        watchlistItems: action.payload,
        error: null,
      };
    case "FETCH_WATCHLIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default watchlistReducer;
