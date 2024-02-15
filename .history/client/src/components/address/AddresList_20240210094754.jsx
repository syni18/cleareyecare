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
      
    ))}
    </>
  );
}

export default AddresList;
