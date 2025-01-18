// store.js
import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpVerified: false, // Track OTP verification
  setOtpVerified: (value) => set({ otpVerified: value }),
}));
