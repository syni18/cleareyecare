// AddressModal.js
import React, { useState } from "react";
import "./addressmodal.css";
import { X, Phone, Truck, User, Edit2, PlusCircle, Trash2 } from "lucide-react";
import NewAddress from "../address/NewAddress"; // Import the existing NewAddress component

const AddressModal = ({ addresses, onClose, updateAddress }) => {
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isEditingOrAdding, setIsEditingOrAdding] = useState(false);

  const handleEditClick = (addressId) => {
    setEditingAddressId(addressId);
    setIsEditingOrAdding(true);
  };

  const handleAddNewClick = () => {
    setEditingAddressId(null);
    setIsEditingOrAdding(true);
  };

  const handleCloseForm = () => {
    setEditingAddressId(null);
    setIsEditingOrAdding(false);
    onClose();
  };

  const handleAddressSaved = (address) => {
    updateAddress(address);
    handleCloseForm();
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!isEditingOrAdding ? (
          <>
            <div className="modal-header">
              <h2>Select Address</h2>
              <div className="mh-new-address">
                <button className="add-new-btn" onClick={handleAddNewClick}>
                  <PlusCircle size={16} />
                  <span>New Address</span>
                </button>
              </div>
              <button className="close-modal" onClick={onClose}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              {addresses.map((address) => (
                <div key={address._id} className="address-item">
                  <div className="address-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(address._id)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleEditClick(address._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="del-cg-type">
                    <span className="cg-type-add">{address.addressType}</span>
                    <h6 className="cg-type-name">
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
                </div>
              ))}
            </div>
          </>
        ) : (
          <NewAddress
            onCancel={handleCloseForm}
            mode={editingAddressId ? "update" : "create"}
            addressSavedData={
              editingAddressId
                ? addresses.find((addr) => addr._id === editingAddressId)
                : null
            }
            onAddressSaved={handleAddressSaved}
          />
        )}
      </div>
    </div>
  );
};

export default AddressModal;
