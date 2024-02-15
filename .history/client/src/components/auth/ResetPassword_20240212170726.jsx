import { useFormik } from 'formik';
import { Minimize } from 'lucide-react';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { resetPasswordValidation } from '../../helper/validate';
import { resetPassword } from '../../helper/helper';

import toast, { Toaster } from "react-hot-toast";
import useFetch from '../../hooks/fetchHooks';
import { useAuthStore } from '../../redux/store/authStore';


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
      <Toaster position="bottom-right"></Toaster>
      <div className="login-container">
        <span className="auth-wrap-close" onClick={handleCloseBox}>
          <Minimize /> <span className="auth-wrcl-text">Close</span>
        </span>
        <div className="loco-left">
          {/* awesome some background style */}
          <h1>Recovery</h1>
          <h3>
            Create a Stronger Shield
            {/* <br /> Wishlist and Recommendations */}
          </h3>
          {/* <h5>
            Renew Your Defense
            <br />
          </h5> */}
        </div>
        <div className="loco-right">
          {/* login form */}
          <form
            action="#"
            className="login-form-wrapper"
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="paswd-help">Enter New Password</label>
            <input
              type="text"
              placeholder="********"
              id="paswd-help"
              {...formik.getFieldProps("password")}
            />

            <label htmlFor="cnpaswd-help">Enter Confirm Password</label>
            <input
              type="password"
              placeholder="Enter Password again"
              id="cnpaswd-help"
              {...formik.getFieldProps("confirmPassword")}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword