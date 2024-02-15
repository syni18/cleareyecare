import React, { useEffect, useState } from "react";
import "./newaddress.css";
import { Locate } from "lucide-react";

function NewAddress({ onCancel, mode }) {
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
              console.log(data);
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
              console.log(formData);
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

  const [statesOptions, setStatesOptions] = useState([]);

  useEffect(() => {
    // Fetch states options initially or whenever there's a change in the data
    fetchStatesOptions();
  }, []);

  const fetchStatesOptions = () => {
    // Fetch your states options from wherever you get them
    // For this example, I'm simulating an API call with a static list
    const states = [
      "Andaman & Nicobar Islands",
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chandigarh",
      "Chhattisgarh",
      "Dadra & Nagar Haveli and Daman & Diu",
      "Delhi",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu & Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Ladakh",
      "Lakshadweep",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Puducherry",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ];
    setStatesOptions(states);
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
                value={formData.fullName}
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
                value={formData.phoneNumber}
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
                value={formData.pincode}
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
                value={formData.locality}
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
              value={formData.address}
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
                value={formData.cityDistrictTown}
                onChange={handleInputChange}
              />
            </div>
            <div className="add-field4-state">
              <label htmlFor="">State</label>
              <select
                name="state"
                id="_state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  --Select State--
                </option>
                {statesOptions.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
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
                value={formData.landmark}
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
                value={formData.altMobile}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="add-address-field6">
            <label htmlFor="">Address Type</label>
            <div className="add-field6-addtype">
              <div className="addtype-office">
                <input
                  type="radio"
                  name="office"
                  id="_office"
                  value={formData.addressType}
                  onChange={handleInputChange}
                />
                <span>Office</span>
              </div>
              <div className="addtype-home">
                <input
                  type="radio"
                  name="home"
                  id="_home"
                  value={formData.addressType}
                  onChange={handleInputChange}
                />
                <span>Home</span>
              </div>
            </div>
          </div>
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
