import { createWithEqualityFn } from "zustand/traditional";

export const useAddressStore = createWithEqualityFn((set) => ({
  addresses: [],
  setAddresses: (newAddresses) => set({ addresses: newAddresses }),
  updateAddress: (updatedAddress) =>
    set((state) => ({
      addresses: state.addresses.map((address) =>
        address.id === updatedAddress.id ? updatedAddress : address
      ),
    })),
  deleteAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((address) => address.id !== id),
    })),
}));
