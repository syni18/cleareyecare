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
  const [showOtpField, setshowOtpField] = useState(false);
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
          setshowOtpField(true);
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
          <div className="lort-box">
            <span className="lrtb-header">Forget Password</span>
            <form className="login-form-wrapper" onSubmit={showOtpField ? handleVerifyOtp : handleSubmit}>
              <FormField
                label="Enter Email Address"
                type="email"
                id="email-help"
                placeholder="john@example.com"
                fieldProps={{
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                }}
              />
              {!showOtpField && (
                <FormField
                  label="Enter OTP"
                  type="text"
                  id="otp-help"
                  placeholder="Enter your OTP"
                  fieldProps={{
                    value: otp,
                    onChange: (e) => setOtp(e.target.value),
                  }}
                />
              )}
              <button type="submit">{!showOtpField ? 'Verify OTP' : 'Send OTP'}</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Recovery;
