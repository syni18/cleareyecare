import React, { useState } from "react";
import NewAddress from "./NewAddress";


function AddresList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
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
   ]);

   const handleEdit = () => {
     setIsEditing(true);
   };
   const addNewAddress = (newAddress) => {
     const updatedAddresses = [...addresses, { ...newAddress, id: Date.now() }];
     setAddresses(updatedAddresses);
   };
   const handleDelete = (index) => {
     const updatedAddresses = [...addresses];
     updatedAddresses.splice(index, 1);
     setAddresses(updatedAddresses);
   };
   const handleCancel = () => {
     setIsEditing(false);
   };

   if (isEditing) {
     return <NewAddress onCancel={handleCancel} mode="edit" />;
   }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      {addresses.map((address) => (
        <div>
          <div className="form-saved-left">
            <div className="saved-address-tag">
              <span>Home</span>
            </div>
            <div className="saved-address-nameph">
              <span className="saved-name">{addresses.fullName}</span>
              <span className="saved-phno">+914553969345</span>
            </div>
            <div className="saved-address-local">
              <span>
                603, bhora kalan patti chainpura, Binola Industrial Area,
                Haryana - 122413
              </span>
            </div>
          </div>
          <div className="address-saved-edit">
            <div className="dropdown">
              <button className="dropbtn" onClick={toggleDropdown}>
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
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <a href="#" onClick={handleEdit}>
                    Edit
                  </a>
                  <a href="#">Delete</a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default AddresList;
