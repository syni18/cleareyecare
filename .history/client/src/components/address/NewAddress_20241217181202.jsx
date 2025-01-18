import React, { useEffect } from "react";
import "./newaddress.css";
import { Locate } from "lucide-react";
import { addAddress } from "../../helper/helper";
import { useFormik } from "formik";

function NewAddress({ onCancel, mode, addressSavedData }) {
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

  const formik = useFormik({
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
      addressType: addressSavedData?.addressType || "home", // default value
    },
  
    onSubmit: async (values) => {
      try {
        const response = await addAddress(values, mode);
        console.log(response.data);
        onCancel();
      } catch (error) {
        console.error("Error adding address:", error);
      }
    },
  });

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            const response = await fetch(url);
            const data = await response.json();
            formik.setValues({
              ...formik.values,
              fullName: data.address.name || "",
              pincode: data.address.postcode || "",
              locality: data.address.suburb || "",
              cityDistrictTown: data.address.city || "",
              state: data.address.state || "",
              address: data.display_name || "",
              landmark: "",
              altMobile: "",
            });
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("Error getting current location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="add-address-wrapper">
      <div className="add-address-container">
        <div className="add-address-head">
          <label>
            {mode === "edit" ? "Edit Address" : "Add A New Address"}
          </label>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="add-current-loc" onClick={handleGetCurrentLocation}>
            <span>
              <Locate size={18} />
              <span>Use my current location</span>
            </span>
          </div>
          <div className="add-address-field1">
            <div className="add-field1-name">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="add-field1-phno">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="10-digit Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="add-address-field2">
            <div className="add-field2-pin">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                name="pincode"
                id="pincode"
                placeholder="Pincode"
                value={formik.values.pincode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="add-field2-locality">
              <label htmlFor="locality">Locality</label>
              <input
                type="text"
                name="locality"
                id="locality"
                placeholder="Locality"
                value={formik.values.locality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.locality && formik.errors.locality ? (
                <div className="error">{formik.errors.locality}</div>
              ) : null}
            </div>
          </div>
          <div className="add-address-field3">
            <label htmlFor="address">Address</label>
            <textarea
              name="address"
              id="address"
              cols="10"
              rows="4"
              placeholder="Address (Area and Street)"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
          </div>
          <div className="add-address-field4">
            <div className="add-field4-city">
              <label htmlFor="cityDistrictTown">City/District/Town</label>
              <input
                type="text"
                name="cityDistrictTown"
                id="cityDistrictTown"
                placeholder="City"
                value={formik.values.cityDistrictTown}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="add-field4-state">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              <label htmlFor="landmark">Landmark</label>
              <input
                type="text"
                name="landmark"
                id="landmark"
                placeholder="Landmark"
                value={formik.values.landmark}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="add-field5-altphn">
              <label htmlFor="altMobile">Alternate Mobile</label>
              <input
                type="text"
                name="altMobile"
                id="altMobile"
                placeholder="Alternate Mobile"
                value={formik.values.altMobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="add-address-field6">
            <label htmlFor="">Address Type</label>
            <div className="add-field6-addtype">
              <div className="addtype-office">
                <input
                  type="radio"
                  name="addressType"
                  id="_office"
                  value="office"
                  checked={formik.values.addressType === "office"}
                  onChange={formik.handleChange}
                />
                <span>Office</span>
              </div>
              <div className="addtype-home">
                <input
                  type="radio"
                  name="addressType"
                  id="_home"
                  value="home"
                  checked={formik.values.addressType === "home"}
                  onChange={formik.handleChange}
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