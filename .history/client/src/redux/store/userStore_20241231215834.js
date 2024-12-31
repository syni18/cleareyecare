// src/store/userStore.js
import { createWithEqualityFn } from "zustand/traditional";


const useUserStore = c((set) => ({
  user: null,
  loading: true,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useUserStore;
