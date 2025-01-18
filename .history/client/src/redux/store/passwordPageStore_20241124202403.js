// store.js
import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpSession: JSON.parse(sessionStorage.getItem("otpSession")) || false, // Track OTP verification
  setOtpSession: (value) => {
    sessionStorage.setItem("otpVerified", JSON.stringify(value));
    set({ otpVerified: value });
  },
}));
