import React, { useEffect, useState, useMemo } from "react";
import NewAddress from "./NewAddress";
import { deleteAddressById, fetchAddress } from "../../helper/helper";

function AddressList({ addresses, setAddresses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownVisibleId, setDropdownVisibleId] = useState(null);
  const [addressSavedData, setAddressSavedData] = useState(null);

  const handleUpdateAddress = (updatedAddress) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === updatedAddress.address.id
          ? updatedAddress.address
          : address
      )
    );
    setIsEditing(false); // Close the edit form
  };

  const handleEdit = (addressId) => {
    const addressToEdit = addresses.find((address) => address.id === addressId);
    setAddressSavedData(addressToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAddressById(id);
      if (response.success) {
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== id)
        );
      } else {
        console.error("Failed to delete address:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDropdownVisibleId(null);
  };

  const toggleDropdown = (addressId) => {
    setDropdownVisibleId((prevId) => (prevId === addressId ? null : addressId));
  };

  const renderedAddresses = useMemo(
    () =>
      addresses.map((address) => (
        <li key={address.id} className="address-item">
          <div className="form-saved-left">
            <div className="saved-address-tag">
              <span>{address.addressType}</span>
            </div>
            <div className="saved-address-nameph">
              <span className="saved-name">{address.fullName}</span>
              <span className="saved-phno">{address.phoneNumber}</span>
            </div>
            <div className="saved-address-local">
              <span>
                {address.address}, {address.cityDistrictTown}, {address.state} -{" "}
                {address.pincode}
              </span>
              <br />
              <span>{address.landmark}</span>
            </div>
          </div>
          <div className="address-saved-edit">
            <div className="dropdown">
              <button
                className="dropbtn"
                onClick={() => toggleDropdown(address.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="grey"
                  stroke="rgb(130,130,130)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-grip-vertical"
                >
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="9" cy="5" r="1" />
                  <circle cx="9" cy="19" r="1" />
                </svg>
              </button>
              <div
                className={`dropdown-content ${
                  dropdownVisibleId === address.id ? "visible" : ""
                }`}
              >
                <button onClick={() => handleEdit(address.id)}>Edit</button>
                <button onClick={() => handleDelete(address.id)}>Delete</button>
              </div>
            </div>
          </div>
        </li>
      )),
    [addresses, dropdownVisibleId]
  );

  return (
    <>
      {isEditing ? (
        <NewAddress
          onCancel={handleCancel}
          mode="update"
          addressSavedData={addressSavedData}
          onUpdateAddress={handleUpdateAddress}
        />
      ) : (
        <ul className="address-list">{renderedAddresses}</ul>
      )}
    </>
  );
}

export default AddressList;
