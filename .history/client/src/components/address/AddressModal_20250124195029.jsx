// AddressModal.js
import React from "react";
import './addressmodal.css';
import { X, Phone, Truck, User } from "lucide-react";

const AddressModal = ({ addresses, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Select Address</h2>
          <button className="close-modal" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">
          {addresses.map((address) => (
            <div key={address._id} className="address-item">
              <div className="del-cg-type">
                <h6 className="type-cg-name">
                  <span>
                    <User size={16} fill="#ddd" />
                  </span>
                  {address.fullName}
                </h6>
                <span className="type-cg-oh">{address.addressType}</span>
              </div>
              <p className="del-cg-phone">
                <span>
                  <Phone size={16} fill="#ddd" />
                </span>
                {address.phoneNumber}
              </p>
              <p className="del-cg-address">
                <span>
                  <Truck size={16} fill="#ddd" />
                </span>
                {defaultAddress.address}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
