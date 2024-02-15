import React, { useState } from "react";
import NewAddress from "./NewAddress";

function AddresList() {
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState([
    // your address data
  ]);
  const [openDropdowns, setOpenDropdowns] = useState(
    Array(addresses.length).fill(false)
  );

  const handleEdit = () => {
    setIsEditing(true);
  };

  const addNewAddress = (newAddress) => {
    const updatedAddresses = [...addresses, { ...newAddress, id: Date.now() }];
    setAddresses(updatedAddresses);
    setOpenDropdowns([...openDropdowns, false]); // add a new dropdown state
  };

  const handleDelete = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
    const updatedDropdowns = [...openDropdowns];
    updatedDropdowns.splice(index, 1); // remove the dropdown state for the deleted address
    setOpenDropdowns(updatedDropdowns);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const toggleDropdown = (index) => {
    setOpenDropdowns((prevDropdowns) => {
      const updatedDropdowns = [...prevDropdowns];
      updatedDropdowns[index] = !updatedDropdowns[index]; // toggle the state for the clicked dropdown
      return updatedDropdowns;
    });
  };

  return (
    <>
      {isEditing ? (
        <NewAddress onCancel={handleCancel} mode="edit" />
      ) : (
        <>
          <ul>
            {addresses.map((address, index) => (
              <li key={address.id}>
                <div className="form-saved-left">
                  {/* Display your address details */}
                  {/* your address details */}
                </div>
                <div className="address-saved-edit">
                  <div className="dropdown">
                    <button
                      className="dropbtn"
                      onClick={() => toggleDropdown(index)}
                    >
                      {/* your dropdown button icon */}
                    </button>
                    <div
                      className={
                        openDropdowns[index]
                          ? "dropdown-content"
                          : "dropdown-content hidden"
                      }
                      onClick={() => handleEdit(address.id)}
                    >
                      <button>Edit</button>
                      <button onClick={() => handleDelete(index)}>Delete</button>
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
