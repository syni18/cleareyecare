// src/stores/watchlistStore.js
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export const useWishlistStore = createWithEqualityFn(
  devtools((set) => ({
    wishlists: [], // Array of productIds (strings)

    // Set all productIds to the wishlists array
    setWishlists: (idArray) =>
      set(() => ({
        wishlists: Array.isArray(idArray) ? [...idArray] : [],
      })),

    // Add a single productId to the wishlists array
    addItemWishlists: (id) =>
      set((state) => {
        // Ensure no duplicates in the array
        const updatedWishlists = state.wishlists.includes(id)
          ? state.wishlists
          : [...state.wishlists, id];
        return { wishlists: updatedWishlists };
      }),

    // Remove a single productId from the wishlists array
    removeItemWishlists: (id) =>
      set((state) => {
        const filteredWishlists = state.wishlists.filter(
          (productId) => productId !== id
        );
        return { wishlists: filteredWishlists };
      }),
  }),{ name: "WatchlistStore" } // <-- Add a name to the devtools
  )
);

export default useWishlistStore;
