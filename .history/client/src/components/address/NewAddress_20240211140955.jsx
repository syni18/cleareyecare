import React, { useState } from 'react'
import './newaddress.css'
import { Locate } from 'lucide-react';
import { log } from 'degit/dist/index-688c5d50';

function NewAddress({onCancel, mode}) {
   const [formData, setFormData] = useState({
     fullName: "",
     phoneNumber: "",
     pincode: "",
     locality: "",
     address: "",
     cityDistrictTown: "",
     state: "",
     landmark: "",
     altMobile: "",
     addressType: "home", // default value
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
               log
               setFormData({
                 ...formData,
                 pincode: data.address.postcode,
                 locality: data.address.locality,
                 cityDistrictTown: data.address.city,
                 state: data.address.state,
                 landmark: data.address.landmark,
                 address: data.display_name,
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
            {mode === "edit" ? "Edit Address" : "Add A New Address"}
          </label>
        </div>
        <form action="" onSubmit={handleSubmit}>
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
                name="full-name"
                id="_fullname"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-field1-phno">
              <label htmlFor="">Phone Number</label>
              <input
                type="number"
                name="phone-number"
                id="_phoneno"
                placeholder="10-digit Number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="add-address-field2">
            <div className="add-field2-pin">
              <label htmlFor="">Pincode</label>
              <input
                type="number"
                name="pincode"
                id="_pincode"
                placeholder="Pincode"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-field2-locality">
              <label htmlFor="">Locality</label>
              <input
                type="text"
                name="locality"
                id="_locality"
                placeholder="Locality"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="add-address-field3">
            <label htmlFor="">Address</label>
            <textarea
              name="address"
              id="_address"
              cols="10"
              rows="4"
              tabIndex={5}
              placeholder="Address (Area and Street)"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="add-address-field4">
            <div className="add-field4-city">
              <label htmlFor="">City/District/Town</label>
              <input
                type="text"
                name="city-district-town"
                id="_city-district-town"
                placeholder="City"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-field4-state">
              <label htmlFor="">State</label>
              <select name="state" id="_state">
                <option value="select state" disabled>
                  --Select State--
                </option>
                <option value="select state">Andaman & Nicobar Islands</option>
                <option value="select state">Andhra Pradesh</option>
                <option value="select state">Arunachal Pradesh</option>
                <option value="select state">Assam</option>
                <option value="select state">Bihar</option>
                <option value="select state">Chandigarh</option>
                <option value="select state">Chattisgarh</option>
                <option value="select state">
                  Dadra & Nagar Haveli & Daman & Diu
                </option>
                <option value="select state">Delhi</option>
                <option value="select state">Goa</option>
                <option value="select state">Gujarat</option>
                <option value="select state">Haryana</option>
                <option value="select state">Himachal Pradesh</option>
                <option value="select state">Jammu & Kashmir</option>
                <option value="select state">Jharkhand</option>
                <option value="select state">Karnataka</option>
                <option value="select state">Kerala</option>
                <option value="select state">Ladakh</option>
                <option value="select state">Lakshadweep</option>
              </select>
            </div>
          </div>
          <div className="add-address-field5">
            <div className="add-field5-landmark">
              <label htmlFor="">Landmark</label>
              <input
                type="text"
                name="landmark"
                id="_landmark"
                placeholder="Landmark"
                onChange={handleInputChange}
              />
            </div>
            <div className="add-field5-altphn">
              <label htmlFor="">Alternate Mobile</label>
              <input
                type="number"
                name="alt-mobile"
                id="_alt-mobile"
                placeholder="Alternate Mobile"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="add-address-field6">
            <label htmlFor="">Address Type</label>
            <div className="add-field6-addtype">
              <div className="addtype-office">
                <input type="radio" name="office" id="_office" 
                onChange={handleInputChange}/>
                <span>Office</span>
              </div>
              <div className="addtype-home">
                <input type="radio" name="home" id="_home" 
                onChange={handleInputChange}/>
                <span>Home</span>
              </div>
            </div>
          </div>
          <div className="add-address-field7">
            <button type="button" className="add-address-savebtn">
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