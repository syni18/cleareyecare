import { useFormik } from "formik";

import { Minimize } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { authenticate, generateOTP, verifyOtp } from "../../helper/helper";
import toast, {Toaster} from "react-hot-toast";
import { validateRecoveryEmail } from "../../helper/validate";
import { useAuthStore } from "../../redux/store/authStore";
import AuthLeftBox from "./AuthLeftBox";

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

  const formik = useFormik({
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
          let sendOtpPromise = generateOTP(ExistUser.data.email, ExistUser.data.fullname);

          await toast.promise(sendOtpPromise, {
            loading: "Sending...",
            success: <b>OTP Sent to your email address.</b>,
            error: <b>Error in sending OTP.</b>,
          });
          setShowOtpSection(true);
        } else {
          toast.error("Email address doesn't Exist...")
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
      <Toaster position="bottom-right"></Toaster>
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <span className="lort-already">
            <Link to="/login" className="lrtady-link">
              <span className="lrtady-span-text">Already have an account?</span>
              <span className="lrtady-login">Login</span>
            </Link>
          </span>
          <form
            action="#"
            className="login-form-wrapper"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="email-help">Enter Email Address</label>
            <input
              type="email"
              placeholder="john@example.com"
              id="email-help"
              {...formik.getFieldProps("email")}
              disabled={showOtpSection}
              // style={{ backgroundColor: showOtpSection ? "#f1f3f6" : "" }}
            />
            {showOtpSection ? null : <button type="submit">Send OTP</button>}
          </form>

          {/* OTP section */}
          {showOtpSection && (
            <form
              action=""
              className="login-form-wrapper"
              onSubmit={handleVerifyOtp}
            >
              <div className="login-form-otp">
                <p>Can't get OTP ?</p>
                <a href="#" onClick={resendOTP}>
                  Resend
                </a>
              </div>

              <label htmlFor="number-help">Verify OTP</label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                type="number"
                placeholder="123456"
                id="number-help"
              />
              <button type="submit">Recover</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Recovery;
