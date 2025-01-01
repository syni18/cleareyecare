import create from "zustand";

export const useAddressStore = create((set) => ({
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
