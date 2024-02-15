import React, { useState } from "react";
import NewAddress from "./NewAddress";

function AddresList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: "John Doe",
      phoneNumber: "+1234567890",
      address: "123 Main St",
      city: "Anytown",
      state: "Anystate",
      postalCode: "12345",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      phoneNumber: "+1987654321",
      address: "456 Elm St",
      city: "Othertown",
      state: "Anotherstate",
      postalCode: "67890",
    },
    {
      id: 3,
      fullName: "Jane Smith",
      phoneNumber: "+1987654321",
      address: "456 Elm St",
      city: "Othertown",
      state: "Anotherstate",
      postalCode: "67890",
    },
    {
      id: 4,
      fullName: "Jane Smith",
      phoneNumber: "+1987654321",
      address: "456 Elm St",
      city: "Othertown",
      state: "Anotherstate",
      postalCode: "67890",
    },
    {
      id: 5,
      fullName: "Jane Smith",
      phoneNumber: "+1987654321",
      address: "456 Elm St",
      city: "Othertown",
      state: "Anotherstate",
      postalCode: "67890",
    },
  ]);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
    if (openDropdownId === id) {
      setOpenDropdownId(null); // Close the dropdown if the deleted address was open
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <NewAddress onCancel={handleCancel} mode="edit" />;
  }
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <>
      {isEditing ? (
        <NewAddress
          onCancel={handleCancel}
          mode="edit"
          address={addresses.find((address) => address.id === editAddressId)}
        />
      ) : (
        <>
          <ul>
            {addresses.map((address) => (
              <li key={address.id}>
                <div className="form-saved-left">
                  {/* Display your address details */}
                  <div className="form-saved-left">
                    <div className="saved-address-tag">
                      <span>Home</span>
                    </div>
                    <div className="saved-address-nameph">
                      <span className="saved-name">{address.fullName}</span>
                      <span className="saved-phno">{address.phoneNumber}</span>
                    </div>
                    <div className="saved-address-local">
                      <span>
                        {address.address}{address.city}{ad}{address.postalCode}
                      </span>
                    </div>
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
                      className={
                        openDropdownId === address.id
                          ? "dropdown-content"
                          : "dropdown-content hidden"
                      }
                    >
                      <button onClick={() => handleEdit(address.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(address.id)}>
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
