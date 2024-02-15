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

  return (
    <div className="address-form-wrapper">
      <div className="address-form-container">
        <div className="address-form-head">
          <label htmlFor="">Manage Addresses</label>
        </div>
        {showNewAddress && <NewAddress onCancel={handleCancel} />}
        <div className="address-form-add-label" onClick={toggleNewAddress}>
          <label htmlFor="">
            <Plus />
            <span>Add A New Address</span>
          </label>
        </div>
        <ul className="address-form-saved">
          <li>
            <AddresList />
          </li>
          <li>
            <AddresList />
          </li>
          <li>
            <AddresList />
          </li>
          <li>
            <AddresList />
          </li>
          <li>
            <AddresList />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ManageAddress;
