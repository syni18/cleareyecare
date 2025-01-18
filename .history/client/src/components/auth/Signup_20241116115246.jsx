import React from 'react'
import './signup.css';
import { useFormik } from 'formik';
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../helper/validate";
import AuthLeftBox from './AuthLeftBox';
import { GithubSvg, GoogleSvg } from '../../SVG/IconSvg';
import MultiStepForm from './MultiStep';
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
        <AuthLeftBox />
        <div className="loco-right">
          <span className="lr-heading">Sign up</span>
          <div className="lr-box">
            <span className="lr-box-auto social-signup">
              <a
                href="http://localhost:8080/v1/api/auth/google"
                className="social-btn google-btn"
              >
                <GoogleSvg />
                <span>Signup with Google</span>
              </a>
              <a
                href="http://localhost:8080/v1/api/auth/facebook"
                className="social-btn facebook-btn"
              >
                <GithubSvg />
                <span>Signup with Github</span>
              </a>
            </span>
            <div class="horizontal-divider-with-text">
              <span>OR</span>
            </div>
            <MultiStepForm/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;