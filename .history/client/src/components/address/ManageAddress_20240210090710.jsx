import React from "react";
import "./manageaddress.css";
import NewAddress from "./NewAddress";
// import { Plus } from "lucide-react";
// import AddresList from "./AddresList";


function ManageAddress() {
  return (
    <div className="address-form-wrapper">
      <div className="address-form-container">
        <div className="address-form-head">
          <label htmlFor="">Manage Addresses</label>
        </div>
        <NewAddress/>
        <div className="address-form-add-label">
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
