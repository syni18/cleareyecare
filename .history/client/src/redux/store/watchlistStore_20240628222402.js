// src/stores/watchlistStore.js
import create from "zustand";

const useWatchlistStore = create((set) => ({
  watchlist: [],
  addToWatchlist: (item) =>
    set((state) => ({ watchlist: [...state.watchlist, item] })),
  removeFromWatchlist: (itemId) =>
    set((state) => ({
      watchlist: state.watchlist.filter((item) => item.id !== itemId),
    })),
  clearWatchlist: () => set({ watchlist: [] }),
}));

export default useWatchlistStore;
