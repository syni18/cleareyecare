// src/stores/watchlistStore.js
import {createWithEqualityFn}  from "zustand/traditional";
import { devtools } from "zustand/middleware";

import {
  addToWatchlistApi,
  fetchWatchlistItem,
  removeFromWatchlistApi,
  fetchProductsById,
} from "../../helper/helper";


export const useWishlistStore = createWithEqualityFn(
  dev
)
// const useWatchlistStore = createWithEqualityFn((set) => ({
//   watchlistItems: [],
//   loading: false,
//   error: null,

//   addToWatchlist: async (productId) => {
//     set((state) => ({ loading: true, error: null }));
//     try {
//       const response = await addToWatchlistApi(productId);
//       set((state) => ({
//         watchlistItems: response.watchlist,
//         loading: false,
//       }));
//     } catch (error) {
//       console.error("Error adding to watchlist:", error);
//       set({ loading: false, error: error.message });
//     }
//   },

//   removeFromWatchlist: async (productId) => {
//     set((state) => ({ loading: true, error: null }));
//     try {
//       const response = await removeFromWatchlistApi(productId);
//       set((state) => ({
//         watchlistItems: response.watchlist,
//         loading: false,
//       }));
//     } catch (error) {
//       console.error("Error removing from watchlist:", error);
//       set({ loading: false, error: error.message });
//     }
//   },

//   fetchWatchlist: async () => {
//     set((state) => ({ loading: true, error: null }));
//     try {
//       const response = await fetchWatchlistItem();
//       const watchlistIds = response.data.watchlist.map(
//         (item) => item.productId
//       );
//       const products = await Promise.all(
//         watchlistIds.map((id) => fetchProductsById(id))
//       );
//       set({
//         watchlistItems: products.map((item) => item.data),
//         loading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching watchlist:", error);
//       set({ loading: false, error: error.message });
//     }
//   },
// }));

export default useWatchlistStore;
