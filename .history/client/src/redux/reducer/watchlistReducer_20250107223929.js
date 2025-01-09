// // src/redux/reducers/watchlistReducer.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   addToWatchlistApi,
//   fetchWatchlistItem,
//   removeFromWatchlistApi,
//   fetchProductsById,
// } from "../../helper/helper";

// const initialState = {
//   watchlistItems: [],
//   loading: false,
//   error: null,
// };

// // Async thunk for adding to watchlist
// export const addToWatchlist = createAsyncThunk(
//   "watchlist/addToWatchlist",
//   async (productId, { rejectWithValue }) => {

//     try {
//       const response = await addToWatchlistApi(productId);
//       return response.watchlist;
//     } catch (error) {
//       console.error("Error adding to watchlist:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for removing from watchlist
// export const removeFromWatchlist = createAsyncThunk(
//   "watchlist/removeFromWatchlist",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await removeFromWatchlistApi(productId);
//       return response;
//     } catch (error) {
//       console.error("Error removing from watchlist:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Async thunk for fetching watchlist
// export const fetchWatchlist = createAsyncThunk(
//   "watchlist/fetchWatchlist",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchWatchlistItem(); // Assuming this is your endpoint to fetch watchlist items
      
//       const watchlistIds = response.data.watchlist.map((item) => item.productId);

//       const products = await Promise.all(
//         watchlistIds.map((id) => fetchProductsById(id))
//       );
//       console.log("get product", products);
//       return products.map(item => item.data);
//     } catch (error) {
//       console.error("Error fetching watchlist:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const watchlistSlice = createSlice({
//   name: "watchlist",
//   initialState,
//   reducers: {
//     addToWatchlistSuccess: (state, action) => {
//       state.watchlistItems = [...state.watchlistItems, action.payload]; // Immutable update
//     },
//     removeFromWatchlistSuccess: (state, action) => {
//       state.watchlistItems = state.watchlistItems.filter(
//         (item) => item._id !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addToWatchlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToWatchlist.fulfilled, (state, action) => {
//         state.loading = false;
//         const existItem = state.watchlistItems.find(
//           (item) => item._id === action.payload._id
//         );
//         if (!existItem) {
//           state.watchlistItems.push(action.payload);
//         }
//       })
//       .addCase(addToWatchlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeFromWatchlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeFromWatchlist.fulfilled, (state, action) => {
//         state.loading = false;
//         state.watchlistItems = state.watchlistItems.filter(
//           (item) => item._id !== action.payload.productId
//         );
//       })
//       .addCase(removeFromWatchlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchWatchlist.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchWatchlist.fulfilled, (state, action) => {
//         state.loading = false;
//         console.log(action.payload);
//         state.watchlistItems = action.payload;
//       })
//       .addCase(fetchWatchlist.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default watchlistSlice.reducer;
