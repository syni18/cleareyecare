import React, { useState } from "react";
import "./billingaddress.css";
import { CircleDot, Clipboard, Pen, Phone, User } from "lucide-react";
import NewAddress from "../address/NewAddress";

function BillingAddress() {
  const [editAddressId, setEditAddressId] = useState(null);
  const [isNewAddressOpen, setNewAddressOpen] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addresses, setAddresses] = useState([
    // Your addresses array here
  ]);

  const handleEditClick = (addressId) => {
    setEditAddressId(addressId);
    setNewAddressOpen(true); // Open the NewAddress component
  };

  const handleNewAddressClick = () => {
    setNewAddressOpen(true); // Open the NewAddress component
  };

  const handleCloseModal = () => {
    setEditAddressId(null);
    setNewAddressOpen(false); // Close the NewAddress component
  };

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId); // Set the selected address ID
  };

  return (
    <div className="billing-address-wrapper">
      <div className="billing-address-container">
        <div className="bill-label-head">
          <label htmlFor="">Billing Address</label>
          <button
            type="button"
            className="bill-head-new"
            onClick={handleNewAddressClick}
          >
            New Address
          </button>
        </div>
        {isNewAddressOpen ? (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <NewAddress
                addressData={
                  editAddressId
                    ? addresses.find((address) => address.id === editAddressId)
                    : null
                }
                onCancel={handleCloseModal}
                mode={editAddressId ? "edit" : "new"}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="billing-address-scard">
              {addresses.map((address) => (
                <div
                  className={`bill-address-scard-container ${
                    address.id === selectedAddressId ? "selected" : ""
                  }`}
                  key={address.id}
                  onClick={() => handleAddressSelect(address.id)}
                >
                  <div className="bill-scard-tag">
                    <span>{address.addressType}</span>
                    <span className="scard-modify">
                      <CircleDot
                        strokeWidth={3}
                        size={18}
                        className={
                          address.id === selectedAddressId
                            ? "scard-selected-address"
                            : ""
                        }
                      />
                      <span className="bill-label-edit">
                        <Pen
                          size={18}
                          onClick={() => handleEditClick(address.id)}
                        />
                      </span>
                    </span>
                  </div>
                  <div className="bill-scard-nameph">
                    <span className="bill-scard-name">
                      <User size={14} color="#007bff" />
                      &nbsp;{address.fullName}
                    </span>
                    <span className="bill-scard-phno">
                      <span>
                        <Phone size={14} color="#007bff" /> &nbsp;
                        {address.phoneNumber}
                      </span>
                      <span>
                        <Clipboard size={18} color="#007bff" />
                      </span>
                    </span>
                  </div>
                  <div className="bill-scard-locate">
                    <span className="bill-scard-locate-det">
                      {address.locality}
                      <br />
                      {address.cityDistrictTown}, {address.state} <br />
                      {address.pincode}
                    </span>
                    <span className="bill-scard-locate-nearby">
                      {address.landmark}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bill-address-next">
              <button type="button" className="bill-next-payment">
                Ready to Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BillingAddress;
