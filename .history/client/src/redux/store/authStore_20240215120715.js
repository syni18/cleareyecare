// src/store/useAuthStore.js (or any path you prefer)
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    useremail: "",
    userrole
    active: false,
  },
  setFullname: (username) =>
    set((state) => ({ auth: { ...state.auth, username: username } })),
  setUseremail: (useremail) =>
    set((state) => ({ auth: { ...state.auth, useremail: useremail } })),
}));
