import { useFormik } from "formik";
import "./recovery.css";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmailAndSendOTP, verifyOtp } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { recoveryEmailValidation } from "../../helper/validate";
import AuthLeftBox from "./AuthLeftBox";
import { useAuth } from '../../redux/context/AuthContext'; // Adjust path as necessary

const FormField = ({ label, type, id, placeholder, fieldProps, readOnly }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      {...fieldProps}
      readOnly={readOnly}
    />
  </>
);

function Recovery() {
  const otpRefs = useRef([]);
  const { setIsOtpVerified } = useAuth();
  const [showOtpField, setShowOtpField] = useState(false);
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(false); 
  const navigate = useNavigate();
  const { handleSubmit, getFieldProps, setFieldValue, values } = useFormik({
    initialValues: {
      userId: "",
      email: "",
      otp: ["", "", "", ""],
    },
    validate: recoveryEmailValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!showOtpField) {
        try {
          console.log("value", values);

          const response = await toast.promise(
            verifyEmailAndSendOTP(values.email),
            {
              loading: "Sending...",
              success: (response) => {
                setFieldValue("userId", response.userId);
                setIsEmailReadOnly(true);
                // Customize the success message based on the response
                return <b>{response.msg || "Registered Successfully!"}</b>;
              },
              error: (error) => {
                // Customize the error message based on the error response
                return <b>{error.msg || "Could not Register"}</b>;
              },
            }
          );
          setShowOtpField(true);
        } catch (error) {
          toast.error("Error on Submit: ", error);
        }
      } else {
        try {
          // console.log("value else", values);

          const response = await toast.promise(verifyOtp(values), {
            loading: "Verifying...",
            success: (response) => {
              // Customize the success message based on the response
              console.log("response", response);

              return <b>{response.msg || "Registered Successfully!"}</b>;
            },
            error: (error) => {
              // Customize the error message based on the error response
              return <b>{error.msg || "Could not Register"}</b>;
            },
          });
          console.log("response recovery", response);
          
          if (response.SID) {
            setIsOtpVerified(true); // Set OTP verified state
            console.log("OTP Verified: ", true); // Log verification
            navigate("/reset-password", { state: { userId: response.userId } }); // Proceed to reset password
          }
        } catch (error) {
          toast.error("Error on Submit: ", error);
        }
      }
    },
  });

  const handleOtpChange = (index, value) => {
    const newOtp = [...values.otp];
    newOtp[index] = value;
    setFieldValue("otp", newOtp);

    // Focus on the next input
    if (value && index < 3) {
      otpRefs.current[index + 1].focus();
    }

    // Focus on the previous input
    if (!value && index > 0) {
      otpRefs.current[index - 1].focus();
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
            <form className="login-form-wrapper" onSubmit={handleSubmit}>
              <FormField
                label="Enter Email Address"
                type="email"
                id="email-help"
                placeholder="john@example.com"
                fieldProps={getFieldProps("email")}
              />
              {showOtpField && (
                <div className="otp-section">
                  <label htmlFor="otp">Enter OTP</label>
                  <div className="otp-container">
                    {values.otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)} // Store references for OTP inputs
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
