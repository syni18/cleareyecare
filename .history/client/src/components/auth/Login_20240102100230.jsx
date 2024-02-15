import React from 'react'
import './login.css';

import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from 'react-router-dom';
import { Minimize } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right"></Toaster>
      <div className="login-container">
      <span className="auth-wrap-close">
        <Minimize /> <span className='authwrcl'></span>
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
          <Link className="loco-recovery-link" to="/recovery">
            Recover Password
          </Link>
          <Link className="loco-regis-link" to="/register">
            New to Cleareyecare? Create an Account.
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;