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
          <div className="billing-address-scard" key={address.id}>
            <div className="bill-address-scard-container">
              <div className="bill-scard-tag">
                <span>{address.addressType}</span>
                <span className="bill-label-edit">
                  <Pen size={18} onClick={() => handleEditClick(address.id)} />
                </span>
              </div>
              <div className="bill-scard-nameph">
                <span className="bill-scard-name">
                  <User size={14} color="#007bff" />
                  &nbsp;{address.fullName}
                </span>
                <span className="bill-scard-phno">
                  <span>
                    <Phone size={14} color="#007bff" /> &nbsp;{address.phoneNumber}
                  </span>
                  <span>
                    <Clipboard size={18} color="#007bff" />
                  </span>
                </span>
              </div>
              <div className="bill-scard-locate">
                <span className="bill-scard-locate-det">
                  {address.locality}<br />
                  Gurgaon, Haryana <br />
                  122413
                </span>
                <span className="bill-scard-locate-nearby">
                  Near Surya Global School
                </span>
              </div>
            </div>
          </div>
        ))}
        {editAddressId && (
          <NewAddress
            addressData={addresses.find(
              (address) => address.id === editAddressId
            )}
            onCancel={() => setEditAddressId(null)}
            mode="edit"
          />
        )}
      </div>
    </div>
  );
}

export default BillingAddress;
