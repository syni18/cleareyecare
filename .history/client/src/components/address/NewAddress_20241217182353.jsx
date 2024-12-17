import React, { useEffect, useState } from "react";
import "./newaddress.css";
import { useFormik } from "formik";
import { Locate } from "lucide-react";
import { addAddress } from "../../helper/helper";

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

  const { handleSubmit, getFieldProps } = useFormik({
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

  // const [statesOptions, setStatesOptions] = useState([]);
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



  // Simple validation function to check if any required field is empty
  const validateForm = () => {
    const {
      fullName,
      phoneNumber,
      address,
      locality,
      landmark,
      cityDistrictTown,
      state,
    } = formData;

    return (
      fullName &&
      phoneNumber &&
      address &&
      locality &&
      landmark &&
      cityDistrictTown &&
      state
    );
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
                name="fullName"
                id="_fullname"
                placeholder="Name"
                {...getFieldProps("fullName")}
              />
            </div>
            <div className="add-field1-phno">
              <label htmlFor="">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                id="_phoneno"
                placeholder="10-digit Number"
                {...getFieldProps("phoneNumber")}
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
                {...getFieldProps("pincode")}
              />
            </div>
            <div className="add-field2-locality">
              <label htmlFor="">Locality</label>
              <input
                type="text"
                name="locality"
                id="_locality"
                placeholder="Locality"
                {...getFieldProps("locality")}
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
              {...getFieldProps("address")}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="add-address-field4">
            <div className="add-field4-city">
              <label htmlFor="">City/District/Town</label>
              <input
                type="text"
                name="cityDistrictTown"
                id="_city-district-town"
                placeholder="City"
                {...getFieldProps("cityDistrictTown")}
              />
            </div>
            <div className="add-field4-state">
              <label htmlFor="">State</label>
              <select
                name="state"
                id="_state"
                {...getFieldProps("state")}
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
                {...getFieldProps("landmark")}
              />
            </div>
            <div className="add-field5-altphn">
              <label htmlFor="">Alternate Mobile</label>
              <input
                type="number"
                name="altMobile"
                id="_alt-mobile"
                placeholder="Alternate Mobile"
                {...getFieldProps("altMobile")}
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
                  checked={formData.addressType === "office"}

                />
                <span>Office</span>
              </div>
              <div className="addtype-home">
                <input
                  type="radio"
                  name="addressType"
                  id="_home"
                  value="home"
                  checked={formData.addressType === "home"}

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
