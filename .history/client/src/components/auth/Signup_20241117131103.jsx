import React, { useState } from "react";
import "./signup.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../helper/validate";
import AuthLeftBox from "./AuthLeftBox";
import { GithubSvg, GoogleSvg } from "../../SVG/IconSvg";
import MultiStepForm from "./MultiStep";
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

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleNext = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (step < 3) setStep(step + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
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
          <Link to="/login" className="lort-already">
            <span className="lrtady-span-text">Already have an account ?</span>
            <span className="lrtady-login">
              Login
            </span>
          </Link>
          <div className="lort-box">
            <span className="lrtb-header">
              Sign Up
            </span>
            
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;





// <span className="lr-heading">Sign up</span>
//           <div className="lr-box">
//             <span className="lr-box-auto social-signup">
//               <a
//                 href="http://localhost:8080/v1/api/auth/google"
//                 className="social-btn google-btn"
//               >
//                 <GoogleSvg />
//                 <span>Signup with Google</span>
//               </a>
//               <a
//                 href="http://localhost:8080/v1/api/auth/facebook"
//                 className="social-btn facebook-btn"
//               >
//                 <GithubSvg />
//                 <span>Signup with Github</span>
//               </a>
//             </span>
//             <div class="horizontal-divider-with-text">
//               <span>OR</span>
//             </div>
//             <input
//               class="bg-[#ffffff] px-4 py-3 outline-none w-[280px] text-black rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]"
//               name="text"
//               placeholder="Enter email or username"
//               type="text"
//             />
//           </div>