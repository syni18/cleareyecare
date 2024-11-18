import { useFormik } from 'formik';
import { Minimize } from 'lucide-react';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { resetPasswordValidation } from '../../helper/validate';
import { resetPassword } from '../../helper/helper';
import { useAuthStore } from '../../redux/store/authStore';
import toast, { Toaster } from "react-hot-toast";
import useFetch from '../../hooks/fetchHooks';


function ResetPassword() {
  const {useremail} = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, status, serverError }] = useFetch("createResetSession");
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange:false,
    onSubmit: async (values) => {
      console.log("values: ", values, useremail);
      let resetPromise = resetPassword({useremail, password: values.password});

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Succesfully.</b>,
        error: <b>Could not Reset! Try again</b>
      })
      resetPromise.then(function(){
        navigate('/login')
      })
    }
  })
  const navigate = useNavigate();
  const handleCloseBox = () => {
    navigate("/");
  };
    if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    if (serverError)
      return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
    if (status && status !== 201)
      return <Navigate to={"/login"} replace={true}></Navigate>;
  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <span className="lort-already">
            <Link to="/signup" className="lrtady-link">
              <span className="lrtady-span-text">Let’s Get You Started!</span>
              <span className="lrtady-login">Sign Up</span>
            </Link>
          </span>
          <div className="lort-box">
            <span className="lrtb-header">Sign In</span>
            <span className="lr-box-auto social-signup">
              <a
                href="http://localhost:8080/v1/api/auth/google"
                className="social-btn google-btn"
              >
                <GoogleSvg />
                <span>Google</span>
              </a>
              <a
                href="http://localhost:8080/v1/api/auth/facebook"
                className="social-btn facebook-btn"
              >
                <FacebookSvg />
                <span>Facebook</span>
              </a>
            </span>
            <div className="horizontal-divider-with-text">
              Or continue with email address
            </div>
            <form className="login-form-wrapper" onSubmit={handleSubmit}>
              <FormField
                label="Enter Email Address"
                type="email"
                id="email-help"
                placeholder="john@example.com"
                fieldProps={getFieldProps("email")}
              />
              <FormField
                label="Enter your Password"
                type="password"
                id="paswd-help"
                placeholder="password"
                fieldProps={getFieldProps("password")}
              />
              <div className="lfw-forget">
                Trouble logging in?
                <Link to="/recovery">
                  <span className="lfw-forget-link">Recover your account</span>
                </Link>
              </div>
              <button type="submit">Login</button>
              {/* <Link to='/signup'>
                <button type="button" id="lfw-create-account">
                  Create Account
                </button>
              </Link> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword