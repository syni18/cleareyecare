import React from 'react'
import './login.css';

import { useFormik } from "formik";
import { Minimize } from 'lucide-react';
import { loginUser } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from 'react-router-dom';
import { loginValidate } from "../../helper/validate";

function Login() {
  const navigate = useNavigate();
  const handleCloseBox = () => {
    navigate('/');
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        console.log("Submit values: ", values);
        let loginPromise = loginUser({ credential: values });
        await toast.promise(loginPromise, {
          loading: "Logging...",
          success: <b>Login Sucessfully...</b>,
          error: <b>Login Error</b>,
        });
        console.log();
        loginPromise.then((res) => {
          let { token } = res.data;
          localStorage.setItem("token", token);
        });
        await navigate("/");
      } catch (error) {
        console.error("Error in onSubmit: ", error);
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
          <h1>Login</h1>
          <h3>
            Get access to your Orders,
            <br /> Wishlist and Recommendations
          </h3>
        </div>
        <div className="loco-right">
          {/* login form */}
          <form
            action="#"
            className="login-form-wrapper"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="email-help">Enter Email Address</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              id="email-help"
                {...formik.getFieldProps("email")}
            />
            <label htmlFor="paswd-help">Enter your Password</label>
            <input
              type="password"
              placeholder="*******"
              id="paswd-help"
                {...formik.getFieldProps("password")}
            />
            <p>
              By continuing, you agree to Cleareyecare's <em>Terms of Use</em>{" "}
              and <em>Privacy Policy</em>.
            </p>
            <button type="submit">Login</button>
          </form>
          <Link className="loco-recovery-link" to="/recovery">
            Recover Password
          </Link>
          <Link className="loco-regis-link" to="/signup">
            New to Cleareyecare? Create an Account.
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;