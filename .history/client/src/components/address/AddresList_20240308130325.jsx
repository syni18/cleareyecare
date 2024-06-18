import React, { useState } from "react";
import NewAddress from "./NewAddress";
import { fetchAddress } from "../../helper/helper";

function AddresList() {
  const [isEditing, setIsEditing] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [addresses, setAddresses] = useState([
  // {
  //   id: 1,
  //   fullName: "John Doe",
  //   phoneNumber: "+1234567890",
  //   address: "123 Oak St",
  //   city: "Sometown",
  //   state: "Somestate",
  //   postalCode: "12345"
  // },
  // {
  //   id: 2,
  //   fullName: "Alice Johnson",
  //   phoneNumber: "+1122334455",
  //   address: "789 Maple Ave",
  //   city: "Anotherville",
  //   state: "Anotherstate",
  //   postalCode: "54321"
  // },
  // {
  //   id: 3,
  //   fullName: "Bob Thompson",
  //   phoneNumber: "+1555666777",
  //   address: "456 Pine Rd",
  //   city: "Anytown",
  //   state: "Anystate",
  //   postalCode: "98765"
  // },
  // {
  //   id: 4,
  //   fullName: "Mary Brown",
  //   phoneNumber: "+1987654321",
  //   address: "321 Cedar Blvd",
  //   city: "Thistown",
  //   state: "Thatstate",
  //   postalCode: "13579"
  // },
  // {
  //   id: 5,
  //   fullName: "Jane Smith",
  //   phoneNumber: "+1987654321",
  //   address: "456 Elm St",
  //   city: "Othertown",
  //   state: "Anotherstate",
  //   postalCode: "67890"
  // },
  // {
  //   id: 6,
  //   fullName: "David Lee",
  //   phoneNumber: "+1888777666",
  //   address: "555 Birch Ln",
  //   city: "Newville",
  //   state: "Newstate",
  //   postalCode: "24680"
  // },
  // {
  //   id: 7,
  //   fullName: "Sara Garcia",
  //   phoneNumber: "+1444333222",
  //   address: "777 Walnut Dr",
  //   city: "Westtown",
  //   state: "Weststate",
  //   postalCode: "97531"
  // },
  // {
  //   id: 8,
  //   fullName: "Michael Nguyen",
  //   phoneNumber: "+1666555444",
  //   address: "888 Pineapple Blvd",
  //   city: "Tropicalia",
  //   state: "Sunnyland",
  //   postalCode: "50505"
  // },
  // {
  //   id: 9,
  //   fullName: "Laura Kim",
  //   phoneNumber: "+1777888999",
  //   address: "999 Orange Ave",
  //   city: "Fruitopia",
  //   state: "Citrusstate",
  //   postalCode: "11223"
  // },
  // {
  //   id: 10,
  //   fullName: "Kevin Patel",
  //   phoneNumber: "+1999888777",
  //   address: "222 Cherry St",
  //   city: "Sweetville",
  //   state: "Fruitystate",
  //   postalCode: "33221"
  // }
]);
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
}, [userId]); 

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
                        {address.address} &nbsp; {address.city} &nbsp;
                        {address.state}&nbsp; {address.postalCode}
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
                          ? "dropdown-content" // Apply the class for left positioning
                          : "dropdown-content hidden" // Hide content by default
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
