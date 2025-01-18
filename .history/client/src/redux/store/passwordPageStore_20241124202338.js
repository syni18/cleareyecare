// store.js
import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpSession: JSON.parse(sessionStorage.getItem("otp")) || false, // Track OTP verification
  setOtpSession: (value) => set({ otpSession: value }),
}));
