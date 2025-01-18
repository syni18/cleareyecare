import React, { useEffect, useState } from "react";
import NewAddress from "./NewAddress";
import { deleteSavedAddress, fetchAddress } from "../../helper/helper";

function AddressList() {
  const [isEditing, setIsEditing] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addressSavedData, setAddressSavedData] = useState({});

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetchAddress();
        setAddresses(response.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleEdit = (addressId) => {
    const addressToEdit = addresses.find(
      (address) => address.addressId === addressId
    );
    setAddressSavedData(addressToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (addressId) => {
    try {
      await deleteSavedAddress(addressId);
      setAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.addressId !== addressId)
      );
      setOpenDropdownId(null);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const toggleDropdown = (addressId) => {
    setOpenDropdownId(openDropdownId === addressId ? null : addressId);
  };

  return (
    <>
      <p>hrggbfgnrf</p>
    </>
  );
}

export default AddressList;
