import React, { useState } from "react";
import "./manageaddress.css";
import NewAddress from "./NewAddress";
import { Plus } from "lucide-react";
import AddresList from "./AddresList";
import { fetchAddress } from "../../helper/helper";

function ManageAddress() {
  const [addresses, setAddresses] = useState([]);
  const [showNewAddress, setShowNewAddress] = useState(false);

  const toggleNewAddress = () => {
    setShowNewAddress(!showNewAddress);
  };

  const handleCancel = () => {
    setShowNewAddress(false); // Hide the NewAddress component
  };
  
  const handleAddAddress = (newAddress) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setShowNewAddress(false); // Hide NewAddress form after adding
  };

  const fetchAddresses = async () => {
    try {
      const response = await fetchAddress();
      setAddresses(response.addressList); // Update state with fetched addresses
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  React.useEffect(() => {
     fetchAddresses();
   }, []);

  return (
    <div className="address-form-wrapper">
      <div className="address-form-container">
        <div className="address-form-head">
          <label htmlFor="">Manage Addresses</label>
        </div>
        {showNewAddress && <NewAddress onCancel={handleCancel} mode={"create"} />}
        {!showNewAddress && (
          <div className="address-form-add-label" onClick={toggleNewAddress}>
            <label htmlFor="">
              <Plus />
              <span>Add A New Address</span>
            </label>
          </div>
        )}
        <div className="address-form-saved">
            <AddresList />
        </div>
      </div>
    </div>
  );
}

export default ManageAddress;
