import React, { useState } from "react";
import "./profileinfo.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { updateProfileInfo } from "../../helper/helper";
import { useUser  } from "../../redux/context/UserContext";
import { profileEditValidation } from "../../helper/validate";

const InputField = ({ label, name, type, placeholder, disabled, error }) => (
  <div className="form-fl-10ihzl">
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      disabled={disabled}
    />
    {error && <div className="error">{error}</div>}
  </div>
);

function ProfileInfo() {
  const { user } = useUser ();
  const [editModes, setEditModes] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phoneNo: false,
  });

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      phoneNo: user.phone || "",
    },
    validate: profileEditValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const response = await updateProfileInfo({ credential: values });
        console.log(response);
        // You may update UI or show a success message here
      } catch (error) {
        console.error("Error in onSubmit: ", error);
      }
    },
  });

  const toggleEditMode = (field) => {
    setEditModes((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="profile-info-wrapper">
      <Toaster position="bottom-right" />
      <div className="profile-info-container">
        <form className="info-form-10ihfff" onSubmit={handleSubmit}>
          <div className="info-head-10ih">
            <span className="_10ihqw">Personal Information</span>
            <span
              className="_10ihec"
              onClick={() => {
                toggleEditMode('firstname');
                toggleEditMode('lastname');
              }}
            >
              edit
            </span>
          </div>
          <div className="form-10ihfff-fl">
            <InputField
              label="First Name"
              name="firstname"
              type="text"
              placeholder={user.firstname}
              disabled={!editModes.firstname}
              error={touched.firstname && errors.firstname}
              {...getFieldProps("firstname")}
            />
            <InputField
              label="Last Name"
              name="lastname"
              type="text"
              placeholder={user.lastname}
              disabled={!editModes.lastname}
              error={touched.lastname && errors.lastname}
              {...getFieldProps("lastname")}
            />
          </div>
          <button
            type="submit"
            className="form-save-btn"
            disabled={!editModes.firstname && !editModes.lastname}
          >
            Save
          </button>

          <div className="info-head-10ih">
            <span className="_10ihqw">Email Address</span>
            <span
              className="_10ihec"
              onClick={() => toggleEditMode('email')}
            >
              edit
            </span>
          </div>
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder={user.email}
            disabled={!editModes.email}
            error={touched.email && errors.email}
            {...getFieldProps("email")}
          />
          <button
            type="submit"
            className="form-save-btn"
            disabled={!editModes.email}
          >
            Save
          </button>

          <div className="info-head-10ih">
            <span className="_10ihqw">Phone Number</span>
            <span
              className="_10ihec"
              onClick={() => toggleEditMode('phoneNo')}
            >
              edit
            </span>
          </div>
          <InputField
            label="Phone no."
            name="phoneNo"
            type="number"
            placeholder={user.phone ? user.phone : "+91-1234567890"}
            disabled={!editModes.phoneNo}
            error={touched.phoneNo && errors.phoneNo}
            {...getFieldProps("phoneNo")}
          />
          <button
            type="submit"
            className="form-save-btn"
            disabled={!editModes.phoneNo}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;