// store.js
import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpse: false, // Track OTP verification
  setOtpVerified: (value) => set({ otpVerified: value }),
}));
