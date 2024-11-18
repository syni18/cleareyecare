import { useFormik } from 'formik';
import { Minimize } from 'lucide-react';
import React from 'react'
import './login.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { resetPasswordValidation } from '../../helper/validate';
import { resetPassword } from '../../helper/helper';
import { useAuthStore } from '../../redux/store/authStore';
import toast, { Toaster } from "react-hot-toast";
import useFetch from '../../hooks/fetchHooks';
import AuthLeftBox from './AuthLeftBox';

const FormField = ({ label, type, id, placeholder, formikProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...formikProps} />
  </>
);

function ResetPassword() {
  const {useremail} = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, status, serverError }] = useFetch("createResetSession");
  const {handleSubmit, getFieldProps} = useFormik({
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
    // if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
    // if (serverError)
    //   return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
    // if (status && status !== 201)
    //   return <Navigate to={"/login"} replace={true}></Navigate>;
  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <div className="lort-box">
            <span className="lrtb-header">Create Password</span>
            <form className="login-form-wrapper" onSubmit={handleSubmit}>
              <FormField
                label="New Password"
                type="text"
                id="pswd-help"
                placeholder="new password"
                fieldProps={getFieldProps("n")}
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