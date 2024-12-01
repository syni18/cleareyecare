import { useFormik } from "formik";
import "./recovery.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, generateOTP, verifyOtp } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { validateRecoveryEmail } from "../../helper/validate";
import AuthLeftBox from "./AuthLeftBox";

const FormField = ({ label, type, id, placeholder, fieldProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...fieldProps} />
  </>
);

function Recovery() {
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to hold each digit of the OTP
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: ["", "", "", ""],
    },
    validate: (values) => {
      console.log("valu", values);
      
      // const errors = validateRecoveryEmail(values.email);
      // return errors;
    },
    onSubmit: async (values) => {
      try {
        console.log("vl", values);
        
        // const ExistUser = await authenticate(values.email);

        // if (ExistUser.status === 200) {
        //   // Send OTP
        //   await toast.promise(
        //     generateOTP(ExistUser.data.email, ExistUser.data.fullname),
        //     {
        //       loading: "Sending...",
        //       success: <b>OTP Sent to your email address.</b>,
        //       error: <b>Error in sending OTP.</b>,
        //     }
        //   );
          setShowOtpField(true);
        // } else {
        //   toast.error("Email address doesn't Exist...");
        // }
      } catch (error) {
        toast.error("Error on Submit: ", error);
      }
    },
  });

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move focus to the next input if the current input is filled
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    // Move focus back to the previous input if the current input is empty
    if (!value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }

    setOtp(newOtp);
    formik.setFieldValue("otp", newOtp); // Update Formik's OTP state
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    const otpString = otp.join("");
    try {
      const { data, status } = await verifyOtp({
        code: otpString,
        email: formik.values.email,
      });
      if (status === 201) {
        toast.success("Verify Successfully!");
        navigate("/reset-password");
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      toast.error("Wrong OTP! Check email again");
    }
  };

  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <div className="lort-box">
            <span className="lrtb-header">Forget Password</span>
            <form
              className="login-form-wrapper"
              onSubmit={showOtpField ? handleVerifyOtp : formik.handleSubmit}
            >
              <FormField
                label="Enter Email Address"
                type="email"
                id="email-help"
                placeholder="john@example.com"
                fieldProps={{
                  value: formik.values.email,
                  onChange: formik.handleChange,
                  onBlur: formik.handleBlur,
                }}
              />
              {showOtpField && (
                <div className="otp-section">
                  <label htmlFor="otp">Enter OTP</label>
                  <div className="otp-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        className=" otp-input-f"
                      />
                    ))}
                  </div>
                </div>
              )}
              <button type="submit">
                {showOtpField ? "Verify OTP" : "Send OTP"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recovery;
