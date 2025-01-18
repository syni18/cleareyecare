import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export const useAddressStore = createWithEqualityFn(devtools((set) => ({
  addresses: [],
  // Append new addresses to the existing array
  setAddresses: (newAddresses) =>
    set((state) => ({
      addresses: Array.isArray(newAddresses)
        ? [...state.addresses, ...newAddresses] // Add multiple addresses if newAddresses is an array
        : [...state.addresses, newAddresses], // Add a single address if it's an object
    })),
  updateAddress: (updatedAddress) =>
    set((state) => {
      const newAddresses = state.addresses.map((address) =>
        address.id === updatedAddress.address.id
          ? updatedAddress.address
          : address
      );
      console.log("Updated Addresses Array:", newAddresses, updatedAddress);
      return { addresses: newAddresses };
    }),
  deleteAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((address) => address.id !== id),
    })),
}));
