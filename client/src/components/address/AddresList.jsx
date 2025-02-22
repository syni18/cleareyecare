import React, { useEffect, useRef, useState } from "react";
import NewAddress from "./NewAddress";
import { deleteAddressById, fetchAddress } from "../../helper/helper";
import { useAddressStore } from "../../redux/store/addressStore";

function AddressList() {
  const { addresses, setAddresses, updateAddress, deleteAddress } = useAddressStore();
  const [isEditing, setIsEditing] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  // const [addresses, setAddresses] = useState([]);
  const [addressSavedData, setAddressSavedData] = useState({});
 const hasFetched = useRef(false); // Track if fetch has already happened

 useEffect(() => {
   const fetchAddresses = async () => {
     try {
       const response = await fetchAddress();
       console.log("trrt", response);
       
       setAddresses(response.addressList.addresses); // Update Zustand state
     } catch (error) {
       console.error("Error fetching addresses:", error);
     }
   };

   if (!hasFetched.current) {
     hasFetched.current = true; // Mark as fetched
     fetchAddresses();
   }
 }, [setAddresses]);
 

  const handleEdit = (addressId) => {
    const addressToEdit = addresses.find((address) => address.id === addressId);
    setAddressSavedData(addressToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteAddressById(id);
      if (response.success) {
        console.log("Address deleted", id);
        
        deleteAddress(id); // Update Zustand state
      } else {
        console.error("Failed to delete address:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setOpenDropdownId(null);
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
                      openDropdownId === address.id ? "visible" : ""
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
