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
        console.log("address", response.addressList);
        
        setAddresses(response.addressList);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleUpdateAddress = (updatedAddress) => {
    console.log("update addre", updatedAddress);
    
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) =>
        address.id === updatedAddress.address.id ? updatedAddress.address : address
      )
    );
    console.log("sfd", addresses);
    
    setIsEditing(false); // Close the edit form
  };
  
  const handleEdit = (addressId) => {
    const addressToEdit = addresses.find(
      (address) => address.id === addressId
    );
    console.log("address to edit", addressToEdit);
    
    setAddressSavedData(addressToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAddressById(`/api/address/${id}`);
      if (response.data.success) {
        setAddresses((prevAddresses) =>
          prevAddresses.filter((address) => address.id !== id)
        );
        console.log("Address deleted successfully.");
      } else {
        console.error("Failed to delete address:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setD
  };

  const toggleDropdown = (addressId) => {
    setOpenDropdownId(openDropdownId === addressId ? null : addressId);
  };

  return (
    <>
      {isEditing ? (
        <NewAddress
          onCancel={handleCancel}
          mode="update"
          addressSavedData={addressSavedData}
          onUpdateAddress={handleUpdateAddress} // Pass the callback
        />
      ) : (
        <ul>
          {addresses.map((address) => (
            <li key={address.id}>
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
                    {address.address} &nbsp;{address.cityDistrictTown} &nbsp;
                    {address.state}&nbsp; {address.pincode}
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
                      openDropdownId === address.id ? "" : "hidden"
                    }`}
                  >
                    <button onClick={() => handleEdit(address.id)}>Edit</button>
                    <button onClick={() => handleDelete(address.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default AddressList;
