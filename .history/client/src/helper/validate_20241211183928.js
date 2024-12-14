import toast from "react-hot-toast";
import { authenticate } from "./helper";

// validate username
function verifyNameString(error = {}, values) {
  // Updated regex to only allow alphabets (both uppercase and lowercase)
  const NameRegEx = /^[a-zA-Z]+$/;

  // Check if firstname exists
  if (!values.firstname) {
    error.firstname = toast.error("First name is required!");
  } else if (values.firstname.length < 3) {
        error.firstname = toast.error("Enter valid First name!");
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
function verifyPasswordString(error = {}, values) {
  // Regular expressions for validation
  const upperCaseRegEx = /[A-Z]/; // At least one uppercase letter
  const lowerCaseRegEx = /[a-z]/; // At least one lowercase letter
  const digitRegEx = /\d/; // At least one digit
  const specialCharRegEx = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/; // At least one special character

  if (!values.password) {
    error.password = toast.error("Password Required!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Password cannot contain spaces");
  } else if (values.password.length < 8) {
    error.password = toast.error("Password must be at least 8 characters");
  } else if (values.password.length > 16) {
    error.password = toast.error("Password must not exceed 16 characters");
  } else if (!upperCaseRegEx.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least one uppercase letter"
    );
  } else if (!lowerCaseRegEx.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least one lowercase letter"
    );
  } else if (!digitRegEx.test(values.password)) {
    error.password = toast.error("Password must contain at least one digit");
  } else if (!specialCharRegEx.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least one special character"
    );
  }

  return error;
}

// validate login page username
export async function loginValidation(values){
    const errors = verifyEmailString({}, values);
    verifyPasswordString(errors, values);

    return errors;
}

// validate register form
export async function signupValidation(values){
    const errors = verifyNameString({}, values);
    verifyEmailString(errors,values);
    verifyPasswordString(errors, values);

    return errors;
}
// recovery Email validate
export async function recoveryEmailValidation(values){
    const errors = verifyEmailString({}, values);
    return errors;
}

// password reset validate
export async function resetPasswordValidation(values){
    console.log(values);
     const errors = verifyPasswordString({}, values);
     let res = (values.password !== values.confirmPassword);
     
     if (res) {
       errors.exist = toast.error('Password not match...!');
     }

     return errors;
}

// profile informaton validate
export async function profileEditValidation(values) {
  if()
    const errors = verifyEmailString({}, values);
    userPhonenoVerify(errors, values);
    return errors;
}
