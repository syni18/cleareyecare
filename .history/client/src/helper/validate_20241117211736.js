import toast from "react-hot-toast";
import { authenticate } from "./helper";

// validate username
function verifyNameString(error = {}, values) {
  // Updated regex to only allow alphabets (both uppercase and lowercase)
  const NameRegEx = /^[a-zA-Z]+$/;

  // Check if firstname exists
  if (!values.firstname) {
    error.firstname = toast.error("First name is required!");
  } else if (!NameRegEx.test(values.firstname)) {
    error.firstname = toast.error("Provide a correct first name");
  }

  // Check if lastname exists (optional)
  if (values.lastname) {
    if (!NameRegEx.test(values.lastname)) {
      error.lastname = toast.error("Provide a correct last name");
    }
  }

  return error;
}


// validate emails
function verifyEmailString(error={}, values){
    const EmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!values.email){
        error.email = toast.error("Email address Required!")
    }
    else if(values.email.includes(" ")){
        error.email = toast.error("wrong Email address")
    }
    else if(!EmailRegEx.test(values.email)){
        error.email = toast.error("Invalid Email address")
    }
    return error;
}

// validate phone number
function userPhonenoVerify(error={}, values){
    const phno = values.phoneNo;
    console.log(typeof phno);
    const str = JSON.stringify(phno);
    if(!values.phoneNo){
        error.phoneNo = toast.error("Phone number Required!");
    }
    else if(str.length !== 10){
        error.phoneNo = toast.error("Phone number Invalid");
    }
    return error;
}

// validate password
function userpasswordVerify(error={}, values) {
    const paswdRegEx = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;
    if(!values.password){
        error.password = toast.error("Password Required!");
    }
    else if(values.password.includes(" ")){
        error.password = toast.error("wrong Password");
    }
    else if(values.password.length < 6) {
        error.password = toast.error("Password must be at least 6 characters");
    }
    else if(!paswdRegEx.test(values.password)){
        error.password = toast.error("Password must Contain Special Character")
    }
    return error;
}

// validate login page username
export async function loginValidate(values){
    const errors = verifyEmailString({}, values);
    userpasswordVerify(errors, values);

    if(values.email){
        //check user exist or not
        const {status} = await authenticate(values.email);
        // console.log(status);
        if(status !== 200) {
            errors.exist = toast.error('User doesn\'t Exist');
        }
    }

    return errors;
}

// validate register form
export async function registerValidate(values){
    const errors = verifyNameString({}, values);
    verifyEmailString(errors,values);
    userpasswordVerify(errors, values);

    return errors;
}
// recovery Email validate
export async function validateRecoveryEmail(values){
    const errors = verifyEmailString({}, values);
    return errors;
}

// password reset validate
export async function resetPasswordValidation(values){
    console.log(values);
     const errors = userpasswordVerify({}, values);
     let res = (values.password !== values.confirmPassword);
     
     if (res) {
       errors.exist = toast.error('Password not match...!');
     }

     return errors;
}

// profile informaton validate
export async function profileValidate(values) {
    const errors = verifyEmailString({}, values);
    userPhonenoVerify(errors, values);
    return errors;
}