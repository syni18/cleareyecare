import create from "zustand";

export const useAuthStore = create((set) => ({
  otpVerified: false,
  setOtpVerified: (value) => set({ otpVerified: value }),
  resetOtpVerification: () => set({ otpVerified: false }),
}));
