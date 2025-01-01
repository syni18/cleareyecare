// src/store/userStore.js
import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";


const useUserStore = createWithEqualityFn(
  devtools(
    (set) => ({
      user: null,
      loading: true,
      error: null,
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
    }),
    { name: "UserStore" } // This will label your store in the dev tools
  )
);

export default useUserStore;
