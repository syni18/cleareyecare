import React, { useState } from "react";
import "./profileinfo.css";
import { useFormik } from "formik";
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
    validate: (values) => {
      const errors = {};

      if (firstNameEditMode && !values.firstName.trim()) {
        errors.firstName = "First name is required";
      }

      else if (lastNameEditMode && !values.lastName.trim()) {
        errors.lastName = "Last name is required";
      }

      if (emailEditMode && !values.email.trim()) {
        errors.email = "Email is required";
      } else if (
        emailEditMode &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (phoneNoEditMode && !values.phoneNo.trim()) {
        errors.phoneNo = "Phone number is required";
      }

      return errors;
    },
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
                  name="firstName"
                  id="_10ihfn"
                  {...formik.getFieldProps("firstName")}
                  placeholder="John"
                  disabled={!NameEditMode}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error">{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="form-fl-10ihzr">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="_10ihln"
                  {...formik.getFieldProps("lastName")}
                  placeholder="Doe"
                  disabled={!NameEditMode}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error">{formik.errors.lastName}</div>
                ) : null}
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
                  name="email"
                  id="_10ihfn"
                  {...formik.getFieldProps("email")}
                  placeholder="John@mail.com"
                  disabled={!emailEditMode}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
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
                  name="phoneNo"
                  id="_10ihfn"
                  {...formik.getFieldProps("phoneNo")}
                  placeholder="+91-0102022045"
                  disabled={!phoneNoEditMode}
                />
                {formik.touched.phoneNo && formik.errors.phoneNo ? (
                  <div className="error">{formik.errors.phoneNo}</div>
                ) : null}
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
