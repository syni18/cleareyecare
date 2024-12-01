import { useFormik } from "formik";
import "./recovery.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, generateOTP, verifyEmailAndSendOTP, verifyOtp } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { recoveryEmailValidation } from "../../helper/validate";
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

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      otp: ["", "", "", ""],
    },
    validate: recoveryEmailValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        console.log("value", values);

        const response = await toast.promise(
          verifyEmailAndSendOTP({ values.email }),
          {
            loading: "Creating...",
            success: (response) => {
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
    // formik.setFieldValue("otp", newOtp); 
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    const otpString = otp.join("");
    try {
      // const { data, status } = await verifyOtp({
      //   code: otpString,
      //   email: formik.values.email,
      // });
      // if (status === 201) {
      //   toast.success("Verify Successfully!");
      //   navigate("/reset-password");
      // } else {
      //   toast.error("Unexpected response. Please try again.");
      // }
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
              onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}
            >
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
