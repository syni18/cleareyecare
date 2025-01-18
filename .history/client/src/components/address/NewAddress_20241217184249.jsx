import React from "react";
import "./newaddress.css";
import { useFormik } from "formik";
import { Locate } from "lucide-react";
import { addAddress } from "../../helper/helper";

const statesOptions = [
  "Andaman & Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam",
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// Reusable input field component
const InputField = ({ label, name, placeholder, type = "text", getFieldProps }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type={type} name={name} placeholder={placeholder} {...getFieldProps(name)} />
  </div>
);

// Reusable textarea field component
const TextareaField = ({ label, name, placeholder, rows = 4, getFieldProps }) => (
  <div className="input-group">
    <label>{label}</label>
    <textarea name={name} rows={rows} placeholder={placeholder} {...getFieldProps(name)}></textarea>
  </div>
);

function NewAddress({ onCancel, mode, addressSavedData }) {
  const { handleSubmit, getFieldProps, setFieldValue } = useFormik({
    initialValues: {
      fullName: addressSavedData?.fullName || "",
      phoneNumber: addressSavedData?.phoneNumber || "",
      pincode: addressSavedData?.pincode || "",
      locality: addressSavedData?.locality || "",
      address: addressSavedData?.address || "",
      cityDistrictTown: addressSavedData?.cityDistrictTown || "",
      state: addressSavedData?.state || "",
      landmark: addressSavedData?.landmark || "",
      altMobile: addressSavedData?.altMobile || "",
      addressType: addressSavedData?.addressType || "home",
    },
    onSubmit: async (values) => {
      try {
        await addAddress(values, mode);
        onCancel();
      } catch (error) {
        console.error("Error adding address:", error);
      }
    },
  });

  const handleGetCurrentLocation = async () => {
    if (!navigator.geolocation) {
      return console.error("Geolocation is not supported by this browser.");
    }
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
          const response = await fetch(url);
          const { address, display_name } = await response.json();

          setFieldValue("pincode", address?.postcode || "");
          setFieldValue("locality", address?.suburb || "");
          setFieldValue("cityDistrictTown", address?.city || "");
          setFieldValue("state", address?.state || "");
          setFieldValue("address", display_name || "");
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      },
      (error) => console.error("Error getting current location:", error.message)
    );
  };

  return (
    <div className="add-address-wrapper">
      <div className="add-address-container">
        <h2>{mode === "edit" ? "Edit Address" : "Add A New Address"}</h2>

        <form onSubmit={handleSubmit}>
          {/* Current Location */}
          <div className="add-current-loc" onClick={handleGetCurrentLocation}>
            <Locate size={18} />
            <span>Use my current location</span>
          </div>

          {/* Input Fields */}
          <div className="field-row">
            <InputField label="Full Name" name="fullName" placeholder="Name" getFieldProps={getFieldProps} />
            <InputField label="Phone Number" name="phoneNumber" placeholder="10-digit Number" type="number" getFieldProps={getFieldProps} />
          </div>

          <div className="field-row">
            <InputField label="Pincode" name="pincode" placeholder="Pincode" type="number" getFieldProps={getFieldProps} />
            <InputField label="Locality" name="locality" placeholder="Locality" getFieldProps={getFieldProps} />
          </div>

          <TextareaField label="Address" name="address" placeholder="Address (Area and Street)" getFieldProps={getFieldProps} />

          <div className="field-row">
            <InputField label="City/District/Town" name="cityDistrictTown" placeholder="City" getFieldProps={getFieldProps} />
            <div className="input-group">
              <label>State</label>
              <select name="state" {...getFieldProps("state")}>
                <option value="" disabled>--Select State--</option>
                {statesOptions.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-row">
            <InputField label="Landmark" name="landmark" placeholder="Landmark" getFieldProps={getFieldProps} />
            <InputField label="Alternate Mobile" name="altMobile" placeholder="Alternate Mobile" type="number" getFieldProps={getFieldProps} />
          </div>

          {/* Address Type */}
          <div className="address-type">
            <label>Address Type</label>
            <div className="address-type-options">
              <label>
                <input type="radio" name="addressType" value="office" {...getFieldProps("addressType")} /> Office
              </label>
              <label>
                <input type="radio" name="addressType" value="home" {...getFieldProps("addressType")} /> Home
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAddress;
