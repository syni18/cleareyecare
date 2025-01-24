// AddressModal.js
import React from "react";

const AddressModal = ({ addresses, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Select Address</h2>
          <button className="close-modal" onClick={onClose}>
            <CloseSquare size={24} />
          </button>
        </div>
        <div className="modal-body">
          {addresses.map((address) => (
            <div key={address._id} className="address-item">
              <h6>{address.fullName}</h6>
              <p>{address.addressType}</p>
              <p>{address.phoneNumber}</p>
              <p>{address.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
