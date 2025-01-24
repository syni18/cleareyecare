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
        
    </div>
  );
};

export default AddressModal;
