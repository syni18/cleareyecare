// store.js
import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpSession: false, // Track OTP verification
  setOtpVerified: (value) => set({ otpVerified: value }),
}));
