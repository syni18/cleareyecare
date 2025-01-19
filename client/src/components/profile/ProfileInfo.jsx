import React, { useState } from "react";
import "./profileinfo.css";
import { useFormik } from "formik";
import { Toaster } from "react-hot-toast";
import { updateProfileInfo } from "../../helper/helper";
import { profileEditValidation } from "../../helper/validate";
import useUserStore from "../../redux/store/userStore";
import styles from "../../css/Button.module.css";


function ProfileInfo() {
  const { setUser, setLoading, setError } = useUserStore();
  const { user, loading, error } = useUserStore((state) => ({
    user: state.user,
    loading: state.loading,
    error: state.error,
  }));
  const [firstNameEditMode, setFirstNameEditMode] = useState(false);
  const [lastNameEditMode, setLastNameEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [phoneNoEditMode, setPhoneNoEditMode] = useState(false);

  const { handleSubmit, getFieldProps, touched, errors, setValues } = useFormik({
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
        console.log(values);
        const response = await updateProfileInfo(values, user);

        if (response && response.data) {
          setUser({ ...response.data.updatedUser }); // Update the user in the store
          setValues({
            firstname: response.data.updatedUser.firstname,
            lastname: response.data.updatedUser.lastname,
            email: response.data.updatedUser.email,
            phoneNo: response.data.updatedUser.phoneNo,
          });
          setFirstNameEditMode(false);
          setLastNameEditMode(false);
          setEmailEditMode(false);
          setPhoneNoEditMode(false);
         }
         
        // You may update UI or show a success message here
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
            edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={handleSubmit}>
          <div>
            {" "}
            <div className="form-10ihfff-fl">
              <div className="form-fl-10ihzl">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="_10ihfn"
                  {...getFieldProps("firstname")}
                  placeholder="John"
                  disabled={!firstNameEditMode}
                />
                {/* {touched.firstname && errors.firstname ? (
                  <div className="error">{errors.firstname}</div>
                ) : null} */}
              </div>
              <div className="form-fl-10ihzr">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="_10ihln"
                  {...getFieldProps("lastname")}
                  placeholder='doe'
                  disabled={!firstNameEditMode}
                />
                {/* {touched.lastname && errors.lastname ? (
                  <div className="error">{errors.lastname}</div>
                ) : null} */}
              </div>
            </div>
            <button
              type="submit"
              className={styles.btnRegular}
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
            edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={handleSubmit}>
          <div>
            {" "}
            <div className="form-10ihfff-fl">
              <div className="form-fl-10ihzl">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="email"
                  id="_10ihfn"
                  {...getFieldProps("email")}
                  placeholder="abc@example.com"
                  disabled={!emailEditMode}
                />
                {/* {touched.email && errors.email ? (
                  <div className="error">{errors.email}</div>
                ) : null} */}
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
            edit
          </span>
        </div>
        <form className="info-form-10ihfff" onSubmit={handleSubmit}>
          <div>
            {" "}
            <div className="form-10ihfff-fl">
              <div className="form-fl-10ihzl">
                <label htmlFor="">Phone no.</label>
                <input
                  type="number"
                  name="phoneNo"
                  id="_10ihfn"
                  {...getFieldProps("phoneNo")}
                  placeholder={user.phone ? user.phone : "+91-1234567890"}
                  disabled={!phoneNoEditMode}
                />
                {/* {touched.phoneNo && errors.phoneNo ? (
                  <div className="error">{errors.phoneNo}</div>
                ) : null} */}
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
