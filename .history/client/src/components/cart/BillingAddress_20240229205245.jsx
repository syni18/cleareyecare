import React, { useState } from "react";
import "./billingaddress.css";
import { Clipboard, Pen, Phone, User } from "lucide-react";
import NewAddress from "../address/NewAddress";

function BillingAddress() {
     const [editAddressId, setEditAddressId] = useState(null);
     const [addresses, setAddresses] = useState([
       {
         id: 1,
         fullName: "Sahil",
         phoneNumber: "3563532413",
         pincode: "122413",
         locality: "VPO bhora kalan patti-chainpura",
         cityDistrictTown: "Gurgaon",
         state: "Haryana",
         landmark: "Near Surya Global School",
         altMobile: "",
         addressType: "home",
       },
       // Add more addresses if needed
     ]);

     const handleEditClick = (addressId) => {
       setEditAddressId(addressId);
     };
  return (
    <div className="billing-address-wrapper">
      <div className="billing-address-container">
        <div className="bill-label-head">
          <label htmlFor="">Billing Address</label>
        </div>
        {addresses.map((address) => (
          <div key={address.id} className="bill-address-item">
            <span>{address.fullName}</span>
            <Pen size={18} onClick={() => handleEditClick(address.id)} />
          </div>
        ))}
        
        {isEditOpen && (
          <NewAddress onCancel={() => setIsEditOpen(false)} mode="edit" />
        )}
      </div>
    </div>
  );
}

export default BillingAddress;
