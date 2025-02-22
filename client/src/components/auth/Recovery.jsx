import React, { useRef, useState } from "react";
import "./recovery.css";
import { useFormik } from "formik";
import AuthLeftBox from "./AuthLeftBox";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../redux/context/AuthContext";
import { recoveryEmailValidation } from "../../helper/validate";
import { verifyEmailAndSendOTP, verifyOtp } from "../../helper/helper";

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
  const [timer, setTimer] = useState(0); // Timer state
  const [showOtpField, setShowOtpField] = useState(false);
  const [isEmailReadOnly, setIsEmailReadOnly] = useState(false); // State for email read-only
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent
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
          const response = await toast.promise(
            verifyEmailAndSendOTP(values.email),
            {
              loading: "Sending...",
              success: (response) => {
                setFieldValue("userId", response.userId);
                setIsEmailReadOnly(true); // Set email input to read-only
                setOtpSent(true); // Mark OTP as sent
                startTimer(); // Start the timer for resend OTP
                return <b>{response.msg || "OTP Sent Successfully!"}</b>;
              },
              error: (error) => {
                return <b>{error.msg || "Could not Send OTP"}</b>;
              },
            }
          );
          setShowOtpField(true);
        } catch (error) {
          toast.error("Error on Submit: ", error);
        }
      } else {
        try {
          const response = await toast.promise(verifyOtp(values), {
            loading: "Verifying...",
            success: (response) => {
              console.log("response", response);
              return <b>{response.msg || "Registered Successfully!"}</b>;
            },
            error: (error) => {
              return <b>{error.msg || "Could not Verify OTP"}</b>;
            },
          });

          if (response.SID) {
            setIsOtpVerified(true); // Set OTP verified state
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

    // Only allow numeric input
    if (/^[0-9]*$/.test(value) || value === "") {
      newOtp[index] = value;
      setFieldValue("otp", newOtp);

      // Move focus to the next input if a digit is entered
      if (value.length === 1 && index < newOtp.length - 1) {
        otpRefs.current[index + 1].focus();
      }

      // Move focus to the previous input if backspace is pressed
      if (value.length === 0 && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    }
  };

  // Function to start the resend timer
  const startTimer = () => {
    setTimer(59); // Set timer for 59 seconds

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          return 0; // Stop timer when it reaches zero
        }
        return prevTimer - 1; // Decrement timer by one second
      });
    }, 1000);
  };

  // Function to clear the timer
  const clearTimer = () => {
    setTimer(0);
  };

  // Function to handle changing email
  const handleChangeEmailClick = () => {
    setShowOtpField(false); // Hide OTP field
    setIsEmailReadOnly(false); // Make email editable again
    setFieldValue("otp", ["", "", "", ""]); // Reset OTP values
    setOtpSent(false); // Reset OTP sent status
    clearTimer(); // Clear timer when changing email
  };

  // Function to handle resending the OTP
  const handleResendOtpClick = async () => {
    try {
      const response = await toast.promise(
        verifyEmailAndSendOTP(values.email),
        {
          loading: "Sending...",
          success: (response) => {
            startTimer(); // Restart the timer when resending OTP
            return <b>{"OTP Resent Successfully!"}</b>;
          },
          error: (error) => {
            return <b>{"Could not Resend OTP"}</b>;
          },
        }
      );
      setOtpSent(true); // Mark OTP as resent
    } catch (error) {
      toast.error("Error on Resend: ", error);
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
                readOnly={isEmailReadOnly} // Pass readOnly prop
              />
              {/* Show change email text only if email is read-only */}
              {isEmailReadOnly && (
                <p className="change-text">
                  Change your email address?{" "}
                  <span className="change-rs" onClick={handleChangeEmailClick}>
                    Click here.
                  </span>
                </p>
              )}
              {showOtpField && (
                <>
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
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          className="otp-input-f"
                        />
                      ))}
                    </div>
                  </div>
                  {/* Show resend OTP text if an OTP has been sent */}
                  {otpSent && (
                    <>
                      {timer > 0 ? (
                        <p className="change-text">
                          Resend OTP in{" "}
                          <span className="change-rs-timer">{timer}</span> sec.
                        </p>
                      ) : (
                        <p className="change-text">
                          Resend OTP?{" "}
                          <span
                            className="change-rs"
                            onClick={handleResendOtpClick}
                          >
                            Click here.
                          </span>
                        </p>
                      )}
                    </>
                  )}
                </>
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
