import React, { useEffect, useState } from "react";
import "./newaddress.css";
import { useFormik } from "formik";
import { Locate } from "lucide-react";
import { editAddress } from "../../helper/helper";
import { useAddressStore } from "../../redux/store/addressStore";

function NewAddress({ onCancel, mode, addressSavedData, onAddressSaved }) {
  const { addresses, setAddresses, updateAddress, deleteAddress } =
    useAddressStore();

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

  const { handleSubmit, getFieldProps, setFieldValue, values } = useFormik({
    initialValues: {
      id: addressSavedData?.id || "",
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
        const response = await editAddress(values, mode);
        console.log(response.data);
        if (mode === "update" && response.data) {
          updateAddress(response.data);
          onAddressSaved(response.data);
        } else {
          setAddresses(response.data.address);
          onAddressSaved(response.data.address);
        }
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
            const { address, display_name } = await response.json();
            // console.log("data", data);

            // Update form fields using setFieldValue
            setFieldValue("pincode", address.postcode || "");
            setFieldValue("locality", address.suburb || "");
            setFieldValue("cityDistrictTown", address.city || "");
            setFieldValue("state", address.state || "");
            setFieldValue("address", display_name || "");
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
          <label htmlFor="">
            {mode === "edit" ? "Edit Address" : "Add A New Address"}
          </label>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="add-current-loc" onClick={handleGetCurrentLocation}>
            <span>
              <Locate size={18} />
              <span>Use current location</span>
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
              rows="3"
              tabIndex={5}
              placeholder="Address (Area and Street)"
              {...getFieldProps("address")}
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
              <select name="state" id="_state" {...getFieldProps("state")}>
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
                  checked={values.addressType === "office"}
                  onChange={() => setFieldValue("addressType", "office")}
                />
                <span>Office</span>
              </div>
              <div className="addtype-home">
                <input
                  type="radio"
                  name="addressType"
                  id="_home"
                  value="home"
                  checked={values.addressType === "home"}
                  onChange={() => setFieldValue("addressType", "home")}
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
