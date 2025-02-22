import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export const useAddressStore = createWithEqualityFn(
  devtools(
    (set) => ({
      addresses: [],
      defaultAddress:{},
      // Append new addresses to the existing array
      setAddresses: (newAddresses) =>
        set((state) => ({
          addresses: Array.isArray(newAddresses)
            ? [...state.addresses, ...newAddresses] // Add multiple addresses if newAddresses is an array
            : [...state.addresses, newAddresses], // Add a single address if it's an object
        })),
      setDefaultAddress: (address) =>
        set((state) => ({ 
          defaultAddress: address 
        })),
      updateAddress: (updatedAddress) =>
        set((state) => {
          const newAddresses = state.addresses.map((address) =>
            address.id === updatedAddress.address.id
              ? updatedAddress.address
              : address
          );
          return { addresses: newAddresses };
        }),
      deleteAddress: (id) =>
        set((state) => {
          const filteredAddresses = state.addresses.filter(
            (address) => address.id !== id
          );
          return {
            addresses: filteredAddresses,
          };
        }),
    }),
    { name: "AddressStore" } // Provide a unique name for the store
  )
);
