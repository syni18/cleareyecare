import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpVerified: false,
  setOtpVerified: (value) => set({ otpVerified: value }),
  resetOtpVerification: () => set({ otpVerified: false }),
}));
