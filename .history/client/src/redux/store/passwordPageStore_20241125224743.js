import {create} from "zustand";

export const usePasswordStore = create((set) => ({
  otpVerified: false,
  setOtpVerified: (value) => {
    console.log("Setting otpVerified:", value);
    set({ otpVerified: value });
  },
  resetOtpVerification: () => {
    console.log("Resetting otpVerified");
    set({ otpVerified: false });
  },
}));
