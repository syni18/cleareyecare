import React, { useState } from "react";
import "./profileinfo.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { updateProfileInfo } from "../../helper/helper";
import { useUser } from "../../redux/context/UserContext";
import { profileEditValidation } from "../../helper/validate";

function ProfileInfo() {
  const { user } = useUser();

  const [editMode, setEditMode] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phoneNo: false,
  });

  const toggleEditMode = (field) => {
    setEditMode((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      phoneNo: user.phoneNo || "",
    },
    validate: profileEditValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const updatedField = Object.keys(editMode).find((key) => editMode[key]);
        const updatedValues = { [updatedField]: values[updatedField] };
        const response = await updateProfileInfo(updatedValues, user);
        console.log("Profile updated successfully:", response);
      } catch (error) {
        console.error("Error updating profile info:", error);
      }
    },
  });

  return (
    <div className="profile-info-wrapper">
      <Toaster position="bottom-right"></Toaster>
      <div className="profile-info-container">
        {/* Personal Information Section */}
        <div className="info-head-10ih">
          <span className="_10ihqw">Personal Information</span>
          <span className="_10ihec" onClick={() => toggleEditMode("firstname")}>
            edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={handleSubmit}>
          <div className="form-10ihfff-fl">
            <div className="form-fl-10ihzl">
              <label htmlFor="_10ihfn">First Name</label>
              <input
                type="text"
                name="firstname"
                id="_10ihfn"
                {...getFieldProps("firstname")}
                placeholder="John"
                disabled={!editMode.firstname}
              />
              {touched.firstname && errors.firstname && (
                <div className="error">{errors.firstname}</div>
              )}
            </div>
            <div className="form-fl-10ihzr">
              <label htmlFor="_10ihln">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="_10ihln"
                {...getFieldProps("lastname")}
                placeholder="Doe"
                disabled={!editMode.lastname}
              />
              {touched.lastname && errors.lastname && (
                <div className="error">{errors.lastname}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="form-save-btn"
            disabled={!editMode.firstname && !editMode.lastname}
          >
            Save
          </button>
        </form>

        {/* Email Section */}
        <div className="info-head-10ih">
          <span className="_10ihqw">Email Address</span>
          <span className="_10ihec" onClick={() => toggleEditMode("email")}>
            edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={handleSubmit}>
          <div className="form-10ihfff-fl">
            <div className="form-fl-10ihzl">
              <label htmlFor="_10ihfn-email">Email</label>
              <input
                type="email"
                name="email"
                id="_10ihfn-email"
                {...getFieldProps("email")}
                placeholder="abc@example.com"
                disabled={!editMode.email}
              />
              {touched.email && errors.email && (
                <div className="error">{errors.email}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="form-save-btn"
            disabled={!editMode.email}
          >
            Save
          </button>
        </form>

        {/* Phone Section */}
        <div className="info-head-10ih">
          <span className="_10ihqw">Phone Number</span>
          <span className="_10ihec" onClick={() => toggleEditMode("phoneNo")}>
            edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={handleSubmit}>
          <div className="form-10ihfff-fl">
            <div className="form-fl-10ihzl">
              <label htmlFor="_10ihfn-phone">Phone no.</label>
              <input
                type="number"
                name="phoneNo"
                id="_10ihfn-phone"
                {...getFieldProps("phoneNo")}
                placeholder="+91-1234567890"
                disabled={!editMode.phoneNo}
              />
              {touched.phoneNo && errors.phoneNo && (
                <div className="error">{errors.phoneNo}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="form-save-btn"
            disabled={!editMode.phoneNo}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
