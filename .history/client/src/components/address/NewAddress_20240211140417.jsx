import React, { useState } from 'react';
import './newaddress.css';
import { Locate } from 'lucide-react';

function NewAddress({ onCancel, mode }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    locality: '',
    address: '',
    cityDistrictTown: '',
    state: '',
    landmark: '',
    altMobile: '',
    addressType: 'home', // default value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              // Update relevant fields with data from API response
              setFormData({
                ...formData,
                // Update fields based on the data from API response
              });
            });
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can use formData here
    console.log(formData);
  };

  return (
    <div className="add-address-wrapper">
      <div className="add-address-container">
        <div className="add-address-head">
          <label htmlFor="">
            {mode === 'edit' ? 'Edit Address' : 'Add A New Address'}
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="add-current-loc" onClick={handleGetCurrentLocation}>
            <span>
              <Locate size={18} />
              <span>Use my current location</span>
            </span>
          </div>
          <div className="add-address-field1">
            <div className="add-field1-name">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="_fullname"
                placeholder="Name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="add-field1-phno">
              <label htmlFor="">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                id="_phoneno"
                placeholder="10-digit Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {/* Add other input fields in a similar manner */}
          <div className="add-address-field7">
            <button type="submit" className="add-address-savebtn">
              Save
            </button>
            <button
              type="button"
              className="add-address-cancelbtn"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAddress;
