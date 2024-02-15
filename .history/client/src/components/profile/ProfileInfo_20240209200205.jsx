import React, { useState } from "react";
import "./profileinfo.css";
import { useFormik } from "formik";
import { profileValidate } from "../../helper/validate";
import { Toaster } from "react-hot-toast";
import { updateProfileInfo } from "../../helper/helper";

function ProfileInfo() {
  const [firstNameEditMode, setFirstNameEditMode] = useState(false);
  const [lastNameEditMode, setLastNameEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [phoneNoEditMode, setPhoneNoEditMode] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      phoneNo: "",
    },
    validate: profileValidate,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        console.log(values);
        let profilePromise = updateProfileInfo({ credential: values });
        console.log(profilePromise);
      } catch (error) {
        console.error("Error in onSubmit: ", error);
      }
    },
  });

  const toggleEditMode = (editModeSetter) => {
    editModeSetter((prevEditMode) => !prevEditMode);
  };

  return (
    <div className="profile-info-wrapper">
      <Toaster position="bottom-right"></Toaster>
      <div className="profile-info-container">
        <div className="info-head-10ih">
          <span className="_10ihqw">Personal Information</span>
          <span
            className="_10ihec"
            onClick={() => toggleEditMode(setFirstNameEditMode)}
          >
            Edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={formik.handleSubmit}>
          <div>
            {" "}
            <div className="form-10ihfff-fl">
              <div className="form-fl-10ihzl">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="first-name"
                  id="_10ihfn"
                  {...formik.getFieldProps("firstName")}
                  placeholder="John"
                  disabled={!firstNameEditMode}
                />
              </div>
              <div className="form-fl-10ihzr">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name="first-name"
                  id="_10ihln"
                  {...formik.getFieldProps("lastName")}
                  placeholder="Doe"
                  disabled={!lastNameEditMode}
                />
              </div>
            </div>
            <button
              type="submit"
              className="form-save-btn"
              disabled={!firstNameEditMode && !lastNameEditMode}
            >
              Save
            </button>
          </div>
        </form>

        {/*  */}

        <div className="info-head-10ih">
          <span className="_10ihqw">Email Address</span>
          <span
            className="_10ihec"
            onClick={() => toggleEditMode(setEmailEditMode)}
          >
            Edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={formik.handleSubmit}>
          <div>
            {" "}
            <div className="form-10ihfff-fl">
              <div className="form-fl-10ihzl">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="email-address"
                  id="_10ihfn"
                  {...formik.getFieldProps("email")}
                  placeholder="John@mail.com"
                  disabled={!emailEditMode}
                />
              </div>
            </div>
            <button
              type="submit"
              className="form-save-btn"
              disabled={!emailEditMode}
            >
              Save
            </button>
          </div>
        </form>

        {/*
         */}
        <div className="info-head-10ih">
          <span className="_10ihqw">Phone Number</span>
          <span
            className="_10ihec"
            onClick={() => toggleEditMode(setPhoneNoEditMode)}
          >
            Edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={formik.handleSubmit}>
          <div>
            {" "}
            <div className="form-10ihfff-fl">
              <div className="form-fl-10ihzl">
                <label htmlFor="">Phone no.</label>
                <input
                  type="number"
                  name="phone-no"
                  id="_10ihfn"
                  {...formik.getFieldProps("phoneNo")}
                  placeholder="+91-0102022045"
                  disabled={!phoneNoEditMode}
                />
              </div>
            </div>
            <button
              type="submit"
              className="form-save-btn"
              disabled={!phoneNoEditMode}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInfo;
