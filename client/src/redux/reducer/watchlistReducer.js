// src/redux/reducers/watchlistReducer.js
const initialState = {
  watchlistItems: [],
};

const watchlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      // Prevent duplicates
      const existItem = state.watchlistItems.find(
        (item) => item.id === action.payload.id
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
          (item) => item.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default watchlistReducer;
