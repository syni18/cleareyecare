import React, { useState } from "react";
import "./manageaddress.css";
import NewAddress from "./NewAddress";
import { Plus } from "lucide-react";
import AddresList from "./AddresList";

function ManageAddress() {
  const [showNewAddress, setShowNewAddress] = useState(false);

  const toggleNewAddress = () => {
    setShowNewAddress(!showNewAddress);
  };

  const handleCancel = () => {
    setShowNewAddress(false); // Hide the NewAddress component
  };

  return (
    <div className="address-form-wrapper">
      <div className="address-form-container">
        <div className="address-form-head">
          <label htmlFor="">Manage Addresses</label>
        </div>
        {showNewAddress ? (
          <NewAddress onCancel={handleCancel} mode={"create"} />
        ) : (
          <>
            <div className="address-form-add-label" onClick={toggleNewAddress}>
              <label htmlFor="">
                <Plus />
                <span>Add A New Address</span>
              </label>
            </div>
            <div className="address-form-saved">
              <AddresList />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ManageAddress;
