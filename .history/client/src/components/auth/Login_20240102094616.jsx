import React from 'react'
import './login.css';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  return (
    <section className="sec-wrapper">
      <Toaster position="bottom-right"></Toaster>
      <div className="sec-container">
        <div className="section-left">
          {/* awesome some background style */}
          <h1>Login</h1>
          <h3>
            Get access to your Orders,
            <br /> Wishlist and Recommendations
          </h3>
        </div>
        <div className="section-right">
          {/* login form */}
          <form
            action="#"
            className="sec-form-wrapper"
            // onSubmit={formik.handleSubmit}
          >
            <label htmlFor="email-help">Enter Email Address</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              id="email-help"
            //   {...formik.getFieldProps("email")}
            />
            <label htmlFor="paswd-help">Enter your Password</label>
            <input
              type="password"
              placeholder="*******"
              id="paswd-help"
            //   {...formik.getFieldProps("password")}
            />
            <p>
              By continuing, you agree to Cleareyecare's <em>Terms of Use</em>{" "}
              and <em>Privacy Policy</em>.
            </p>
            <button type="submit">Login</button>
          </form>
          <Link className="registration-link" to="/recovery">
            Recover Password
          </Link>
          <Link className="registration-link" to="/register">
            New to Cleareyecare? Create an Account.
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;