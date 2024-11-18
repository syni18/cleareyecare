import React from 'react'
import './signup'
import { useFormik } from 'formik';
import { Minimize } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../helper/validate";
import { GoogleSvg } from '../../SVG/IconSvg';
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
          {/* login form */}
          <div className="signup-container">
            <div className="signup-side">
              <button className="close-btn">Close</button>
              <h1>Welcome,</h1>
              <p>Looks like you're new here!</p>
              <p>Sign up with your mobile number to get started</p>
            </div>
            <div className="signup-form-wrapper">
              <h2>Sign up</h2>
              <div className="social-signup">
                <a
                  href="http://localhost:8080/v1/api/auth/google"
                  className="social-btn google-btn"
                >
                  <GoogleSvg />
                  <span>Signup with Google</span>
                </a>
                <div className="divider">|</div>
                <a
                  href="http://localhost:8080/v1/api/auth/facebook"
                  className="social-btn facebook-btn"
                >
                  <FacebookSvg />
                  <span>Signup with Facebook</span>
                </a>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="login-form-wrapper"
              >
                <label htmlFor="email-help">Enter Your Email</label>
                <input
                  type="text"
                  placeholder="johndoe@domain.com"
                  id="email-help"
                  {...formik.getFieldProps("email")}
                />
                <label htmlFor="name-help">Enter Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  id="name-help"
                  {...formik.getFieldProps("fullname")}
                />
                <label htmlFor="paswd-help">Enter Password</label>
                <input
                  type="password"
                  placeholder="*******"
                  id="paswd-help"
                  {...formik.getFieldProps("password")}
                />
                <p>
                  By continuing, you agree to Cleareyecare's{" "}
                  <em>Terms of Use</em> and <em>Privacy Policy</em>.
                </p>
                <button type="submit">Sign up</button>
                <button type="button">
                  <Link to="/login" className="login-linkbtn">
                    Login
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;