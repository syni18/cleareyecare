import React from "react";
import "./newaddress.css";
import { useFormik } from "formik";
import { Locate } from "lucide-react";
import { addAddress } from "../../helper/helper";

const statesOptions = [
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

// Reusable Input Component
const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  className,
  getFieldProps,
}) => (
  <div className={className}>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      {...getFieldProps(name)}
    />
  </div>
);

// Reusable Textarea Component
const TextareaField = ({
  label,
  name,
  placeholder,
  className,
  getFieldProps,
}) => (
  <div className={className}>
    <label htmlFor={name}>{label}</label>
    <textarea
      name={name}
      rows="4"
      placeholder={placeholder}
      {...getFieldProps(name)}
    ></textarea>
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
          const { address, display_name } = await (await fetch(url)).json();

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
        <div className="add-address-head">
          <label>
            {mode === "edit" ? "Edit Address" : "Add A New Address"}
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Use Current Location */}
          <div className="add-current-loc" onClick={handleGetCurrentLocation}>
            <span>
              <Locate size={18} />
              <span>Use my current location</span>
            </span>
          </div>

          {/* Full Name & Phone Number */}
          <div className="add-address-field1">
            <InputField
              label="Full Name"
              name="fullName"
              placeholder="Name"
              className="add-field1-name"
              getFieldProps={getFieldProps}
            />
            <InputField
              label="Phone Number"
              name="phoneNumber"
              placeholder="10-digit Number"
              type="number"
              className="add-field1-phno"
              getFieldProps={getFieldProps}
            />
          </div>

          {/* Pincode & Locality */}
          <div className="add-address-field2">
            <InputField
              label="Pincode"
              name="pincode"
              placeholder="Pincode"
              type="number"
              className="add-field2-pin"
              getFieldProps={getFieldProps}
            />
            <InputField
              label="Locality"
              name="locality"
              placeholder="Locality"
              className="add-field2-locality"
              getFieldProps={getFieldProps}
            />
          </div>

          {/* Address */}
          <TextareaField
            label="Address"
            name="address"
            placeholder="Address (Area and Street)"
            className="add-address-field3"
            getFieldProps={getFieldProps}
          />

          {/* City/Town & State */}
          <div className="add-address-field4">
            <InputField
              label="City/District/Town"
              name="cityDistrictTown"
              placeholder="City"
              className="add-field4-city"
              getFieldProps={getFieldProps}
            />
            <div className="add-field4-state">
              <label>State</label>
              <select name="state" {...getFieldProps("state")}>
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

          {/* Landmark & Alternate Mobile */}
          <div className="add-address-field5">
            <InputField
              label="Landmark"
              name="landmark"
              placeholder="Landmark"
              className="add-field5-landmark"
              getFieldProps={getFieldProps}
            />
            <InputField
              label="Alternate Mobile"
              name="altMobile"
              placeholder="Alternate Mobile"
              type="number"
              className="add-field5-altphn"
              getFieldProps={getFieldProps}
            />
          </div>

          {/* Address Type */}
          <div className="add-address-field6">
            <label>Address Type</label>
            <div className="add-field6-addtype">
              <label className="addtype-office">
                <input
                  type="radio"
                  name="addressType"
                  value="office"
                  {...getFieldProps("addressType")}
                />
                Office
              </label>
              <label className="addtype-home">
                <input
                  type="radio"
                  name="addressType"
                  value="home"
                  {...getFieldProps("addressType")}
                />
                Home
              </label>
            </div>
          </div>

          {/* Buttons */}
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
