import React, { useEffect, useState } from "react";
import NewAddress from "./NewAddress";
import { fetchAddress } from "../../helper/helper";

function AddresList() {
  const [isEditing, setIsEditing] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [addresses, setAddresses] = useState([]);

useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const response = await fetchAddress();
      // console.log(response);
      setAddresses(response.data.addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  fetchAddresses();
}, []); 

  const handleEdit = (addressId) => {
  const addressToEdit = addresses.find((address) => address.addressId === addressId);
  setFormData(addressToEdit); // Set the address details in the state
  setIsEditing(true);
  };
  const handleDelete = (addressId) => {
    setAddresses(addresses.filter((address) => address.addressId !== addressId));
    if (openDropdownId === addressId) {
      setOpenDropdownId(null); // Close the dropdown if the deleted address was open
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // if (isEditing) {
  //   return <NewAddress onCancel={handleCancel} mode="edit" />;
  // }
  const toggleDropdown = (addressId) => {
    setOpenDropdownId(openDropdownId === addressId ? null : addressId);
  };
  

  return (
    <>
      {isEditing ? (
        <NewAddress
          onCancel={handleCancel}
          mode="edit"
          formDa
          // address={addresses.find((address) => address.addressId === editAddressId)}
        />
      ) : (
        <>
          <ul>
            {addresses.map((address) => (
              <li key={address.addressId}>
                <div className="form-saved-left">
                  {/* Display your address details */}
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
                      <br/>
                      <span>
                        {address.landmark}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="address-saved-edit">
                  <div className="dropdown">
                    <button
                      className="dropbtn"
                      onClick={() => toggleDropdown(address.addressId)}
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
                      className={
                        openDropdownId === address.addressId
                          ? "dropdown-content" // Apply the class for left positioning
                          : "dropdown-content hidden" // Hide content by default
                      }
                    >
                      <button onClick={() => handleEdit(address.addressId)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(address.addressId)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default AddresList;
