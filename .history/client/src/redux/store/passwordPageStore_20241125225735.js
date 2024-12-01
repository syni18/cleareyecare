import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpVerified: JSON.parse(sessionStorage.getItem("otpVerified")) || false,
  setOtpVerified: (value) => {
     console.log("[AuthStore] Setting otpVerified:", value);
    sessionStorage.setItem("otpVerified", JSON.stringify(value));
    set({ otpVerified: value });
  },
  resetOtpVerification: () => {
    console.log("[AuthStore] Resetting otpVerified");
    sessionStorage.removeItem("otpVerified");
    set({ otpVerified: false });
  },
}));
