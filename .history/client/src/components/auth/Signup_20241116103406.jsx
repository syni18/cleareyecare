import React from 'react'

import { useFormik } from 'formik';
import { Minimize } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../helper/validate";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from '../../../reducer/reducer.js';

function Signup() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleCloseBox = () => {
    navigate("/");
  };
  const handleGoogleLogin = () => {
    // Call your backend API to initiate Google login via Passport.js
    window.open("/v1/api/auth/google", "_self"); // Adjust the URL according to your setup
  };
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        // console.log("submit values ", values);
        let registerPromise = registerUser({ credential: values });
        await toast.promise(registerPromise, {
          loading: "Creating...",
          success: <b>Register Successfully...!</b>,
          error: <b>Could not Register</b>,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error in onSubmit:", error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
    },
  });
  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right"></Toaster>
      <div className="login-container">
        <span className="auth-wrap-close" onClick={handleCloseBox}>
          <Minimize /> <span className="auth-wrcl-text">Close</span>
        </span>
        <div className="loco-left">
          {/* awesome some background style */}
          <h1>Welcome,</h1>
          <h3>
            Looks like you're new here!
            {/* <br /> Wishlist and Recommendations */}
          </h3>
          <h5>
            Sign up with your mobile number
            <br /> to get started
          </h5>
        </div>
        <div className="loco-right">
          {/* <a href="http://localhost:8080/v1/api/auth/google">
            <button>Sign up with Google</button>
          </a> */}
          {/* login form */}
          div.signup-
        </div>
      </div>
    </section>
  );
}

export default Signup;