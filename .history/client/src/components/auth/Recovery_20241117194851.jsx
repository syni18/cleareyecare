import { useFormik } from "formik";
import './signup.css';
import { Minimize } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authenticate, generateOTP, verifyOtp } from "../../helper/helper";
import toast, {Toaster} from "react-hot-toast";
import { validateRecoveryEmail } from "../../helper/validate";
import { useAuthStore } from "../../redux/store/authStore";
import AuthLeftBox from "./AuthLeftBox";


const FormField = ({ label, type, id, placeholder, fieldProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...fieldProps} />
  </>
);

function Recovery() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const navigate = useNavigate();

  const setFullname = useAuthStore(state => state.setFullname);
  const setUseremail = useAuthStore((state) => state.setUseremail);


  const handleCloseBox = () => {
    navigate("/");
  };

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
    },
    validate: validateRecoveryEmail,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        // console.log(values);
        let ExistUser = await authenticate(values.email);
        console.log("ExistUser", ExistUser);

        if (ExistUser.status === 200) {
          setEmail(ExistUser.data.email);
          setUsername(ExistUser.data.fullname);
          setFullname(ExistUser.data.fullname);
          setUseremail(ExistUser.data.email);
          let sendOtpPromise = generateOTP(
            ExistUser.data.email,
            ExistUser.data.fullname
          );

          await toast.promise(sendOtpPromise, {
            loading: "Sending...",
            success: <b>OTP Sent to your email address.</b>,
            error: <b>Error in sending OTP.</b>,
          });
          setShowOtpSection(true);
        } else {
          toast.error("Email address doesn't Exist...");
          // console.log("Internal error in Authenticate user!");
        }
      } catch (error) {
        console.log("Error on Submit: ", error);
      }
    },
  });
  function resendOTP(){
    let sentPromise = generateOTP(username);
    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been sent again!</b>,
      error: <b>Could not send it!</b>
    });
    sentPromise.then((otp)=> {
      // console.log(otp);
    })
  }

async function handleVerifyOtp(e) {
  e.preventDefault();
  // console.log("recovery otp : ", otp);
  try {
    let { data, status } = await verifyOtp({ username, code: otp, email });
    if (status === 201) {
      toast.success("Verify Successfully!");
      navigate("/reset-password");
    } else {
      // Handle other success statuses or unexpected statuses
      toast.error("Unexpected response. Please try again.");
    }
  } catch (error) {
    return toast.error("Wrong OTP! Check email again");
  }
}


  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <span className="lort-already">
            <Link to="/login" className="lrtady-link">
              <span className="lrtady-span-text">Already have an account?</span>
              <span className="lrtady-login">Login</span>
            </Link>
          </span>
          <div className="lort-box">
            <span className="lrtb-header">Forget P</span>
            <div className="horizontal-divider-with-text">
              Or continue with email address
            </div>
            <form className="login-form-wrapper" onSubmit={handleSubmit}>
              <div className="lfw-name">
                {["firstname", "lastname"].map((field, index) => (
                  <span key={index}>
                    <FormField
                      label={field === "firstname" ? "First Name" : "Last Name"}
                      type="text"
                      id={`${field}-help`}
                      placeholder={field === "firstname" ? "john" : "doe"}
                      fieldProps={getFieldProps(field)}
                    />
                  </span>
                ))}
              </div>
              <FormField
                label="Enter Email Address"
                type="email"
                id="email-help"
                placeholder="john@example.com"
                fieldProps={getFieldProps("email")}
              />
              <FormField
                label="Enter your Password"
                type="password"
                id="paswd-help"
                placeholder="password"
                fieldProps={getFieldProps("password")}
              />
              <button type="submit">Start Shopping</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recovery;
