import create from "zustand";

export const useAuthStore = create((set) => ({
  otpVerified: JSON.parse(sessionStorage.getItem("otpVerified")) || false,
  setOtpVerified: (value) => {
    sessionStorage.setItem("otpVerified", JSON.stringify(value));
    set({ otpVerified: value });
  },
  resetOtpVerification: () => {
    sessionStorage.removeItem("otpVerified");
    set({ otpVerified: false });
  },
}));
