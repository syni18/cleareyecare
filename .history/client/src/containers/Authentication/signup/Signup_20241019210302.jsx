import React from "react";
import { useFormik } from "formik";
import { Minimize } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../../helper/validate";

const Signup = () => {
  const navigate = useNavigate();

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
        const registerPromise = registerUser({ credential: values });
        await toast.promise(registerPromise, {
          loading: "Creating...",
          success: <b>Register Successfully...!</b>,
          error: <b>Could not Register</b>,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
  });

  const handleCloseBox = () => navigate("/");

  return (
    <section className="signup-wrapper">
      <Toaster position="bottom-right" />
      <div className="signup-container">
        <CloseButton onClick={handleCloseBox} />
        <LeftPanel />
        <RightPanel formik={formik} />
      </div>
    </section>
  );
};

const CloseButton = ({ onClick }) => (
  <span className="auth-wrap-close" onClick={onClick}>
    <Minimize /> <span className="auth-wrcl-text">Close</span>
  </span>
);

const LeftPanel = () => (
  <div className="loco-left">
    <h1>Welcome,</h1>
    <h3>Looks like you're new here!</h3>
    <h5>
      Sign up with your mobile number
      <br /> to get started
    </h5>
  </div>
);

const RightPanel = ({ formik }) => (
  <div className="loco-right">
    <form className="login-form-wrapper" onSubmit={formik.handleSubmit}>
      <InputField
        label="Enter Full Name"
        id="name-help"
        type="text"
        placeholder="John Doe"
        {...formik.getFieldProps("fullname")}
      />
      <InputField
        label="Enter Your Email"
        id="email-help"
        type="text"
        placeholder="johndoe@domain.com"
        {...formik.getFieldProps("email")}
      />
      <InputField
        label="Enter Password"
        id="paswd-help"
        type="password"
        placeholder="*******"
        {...formik.getFieldProps("password")}
      />
      <p>
        By continuing, you agree to Cleareyecare's <em>Terms of Use</em> and{" "}
        <em>Privacy Policy</em>.
      </p>
      <button type="submit">Sign up</button>
      <Link to="/login" className="login-linkbtn">
        <button type="button">Login</button>
      </Link>
    </form>
  </div>
);

const InputField = ({ label, id, ...props }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...props} />
  </>
);

export default Signup;
