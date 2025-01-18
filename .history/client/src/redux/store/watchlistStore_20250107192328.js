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
  devtools(
    (set) => ({
      wishlists: [],
      // append new item to wishlists
      setWishlists: (newItem) => 
        set((state) => ({
          wishlists: Array.isArray(newItem)
          ? [ ...newItem ]
          : [newItem],
      })),
      // add items to wishlists
      addItemWishlists: (id) => 
        set((state) => {
          const item = "";
        }),
      // remove item from wishlists
      removeItemWishlists: (id) => 
        set((state) => {
          const filteredWishlists = state.wishlists.filter(
            (wistlist) => wistlist.id !== id
          );
          return { wishlists: filteredWishlists };
        }),
    }),
  )
)


export default useWishlistStore;
