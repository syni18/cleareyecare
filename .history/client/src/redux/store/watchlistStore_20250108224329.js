// src/stores/watchlistStore.js
import {createWithEqualityFn}  from "zustand/traditional";
import { devtools } from "zustand/middleware";


export const useWishlistStore = createWithEqualityFn(
  devtools(
    (set) => ({
      wishlists: [],
      // append new item to wishlists
      setWishlists: (idArray) => 
        set((state) => ({
          wishlists: Array.isArray(idArray)
          ? [ ...idArray ]
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
