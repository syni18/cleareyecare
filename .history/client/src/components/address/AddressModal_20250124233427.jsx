// AddressModal.js
import React, { useState } from "react";
import "./addressmodal.css";
import { X, Phone, Truck, User, Edit2, PlusCircle } from "lucide-react";
import NewAddress from "../address/NewAddress"; // Import the existing NewAddress component

const AddressModal = ({ addresses, onClose, updateAddress }) => {
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  const handleEditClick = (addressId) => {
    setEditingAddressId(addressId);
    setShowNewAddressForm(false);
  };

  const handleAddNewClick = () => {
    setEditingAddressId(null);
    setShowNewAddressForm(true);
  };

  const handleCloseForm = () => {
    setEditingAddressId(null);
    setShowNewAddressForm(false);
  };

  const handleAddressSaved = (address) => {
    updateAddress(address);
    handleCloseForm();
  };

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
                  <span className="type-cg-oh">{address.addressType}</span>

                  <span>
                    <User size={16} fill="#ddd" />
                  </span>
                  {address.fullName}
                </h6>
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
                {address.address}
              </p>
              <div className="address-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(address._id)}
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>
            </div>
          ))}
          <div className="add-new-address">
            <button className="add-new-button" onClick={handleAddNewClick}>
              <PlusCircle size={16} />
              Add New Address
            </button>
          </div>
        </div>
        {editingAddressId !== null && (
          <NewAddress
            onCancel={handleCloseForm}
            mode="edit"
            addressSavedData={addresses.find(
              (addr) => addr._id === editingAddressId
            )}
            onAddressSaved={handleAddressSaved}
          />
        )}
        {showNewAddressForm && (
          <NewAddress
            onCancel={handleCloseForm}
            mode="add"
            onAddressSaved={handleAddressSaved}
          />
        )}
      </div>
    </div>
  );
};

export default AddressModal;
