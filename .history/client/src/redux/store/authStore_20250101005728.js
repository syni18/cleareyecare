import create from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    (set) => ({
      auth: {
        userId: "",
        username: "",
        useremail: "",
        role: "",
        active: false,
      },
      setFullname: (username) =>
        set((state) => ({ auth: { ...state.auth, username: username } })),
      setUseremail: (useremail) =>
        set((state) => ({ auth: { ...state.auth, useremail: useremail } })),
      setUserId: (userId) =>
        set((state) => ({ auth: { ...state.auth, userId: userId } })),
    }),
    { name: "AuthStore" } // Name your store for easy identification in dev tools
  )
);
