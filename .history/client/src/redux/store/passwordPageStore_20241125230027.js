import {create} from "zustand";

export const usePasswordStore = create((set, get) => ({
  otpVerified: false,
  setOtpVerified: (value) => {
    if (get().otpVerified !== value) {
      console.log("[AuthStore] Setting otpVerified:", value);
      set({ otpVerified: value });
    }
  },
  resetOtpVerification: () => {
    if (get().otpVerified) {
      console.log("[AuthStore] Resetting otpVerified");
      set({ otpVerified: false });
    }
  },
}));