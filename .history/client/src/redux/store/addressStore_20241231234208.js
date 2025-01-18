import { createWithEqualityFn } from "zustand/traditional";

export const useAddressStore = createWithEqualityFn((set) => ({
  addresses: [],
  setAddresses: (newAddresses) => set({ addresses: newAddresses }),
  updateAddress: (updatedAddress) =>
    set((state) => {
      const newAddresses = state.addresses.map((address) =>
        address.id === updatedAddress.address.id ? updatedAddress : address
      );
      console.log("Updated Addresses Array:", newAddresses, updatedAddress);
      return { addresses: newAddresses };
    }),
  deleteAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((address) => address.id !== id),
    })),
}));
