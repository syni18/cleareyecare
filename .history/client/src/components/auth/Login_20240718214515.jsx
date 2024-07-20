import React from "react";
import "./login.css"; // Using CSS modules for better scoping and maintenance
import { useFormik } from "formik";
import { Minimize } from "lucide-react";
import { loginUser } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { loginValidate } from "../../helper/validate";

function Login() {
  const navigate = useNavigate();

  const handleCloseBox = () => {
    navigate("/");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const loginPromise = loginUser({ credential: values });
        toast.promise(loginPromise, {
          loading: "Logging in...",
          success: "Login Successful!",
          error: "Login Error",
        });

        const res = await loginPromise;
        localStorage.setItem("token", res.token);
        navigate("/");
      } catch (error) {
        console.error("Error in onSubmit: ", error);
      }
    },
  });

  return (
    <section className={loginWrapper}>
      <Toaster position="bottom-right" />
      <div className={loginContainer}>
        <span className={authWrapClose} onClick={handleCloseBox}>
          <Minimize /> <span className={authWrclText}>Close</span>
        </span>
        <div className={locoLeft}>
          <h1>Login</h1>
          <h3>
            Get access to your Orders,
            <br /> Wishlist and Recommendations
          </h3>
        </div>
        <div className={locoRight}>
          <form
            action="#"
            className={loginFormWrapper}
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
          <Link className={locoRecoveryLink} to="/recovery">
            Recover Password
          </Link>
          <Link className={locoRegisLink} to="/signup">
            New to Cleareyecare? Create an Account.
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
