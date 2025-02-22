import toast from "react-hot-toast";

// validate username
function verifyNameString(error = {}, values) {
  // Updated regex to only allow alphabets (both uppercase and lowercase)
  const NameRegEx =import.meta.env.VITE_REGEX_NAME;

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
    const EmailRegEx = import.meta.env.VITE_REGEX_EMAIL;
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
  const upperCaseRegEx = import.meta.env.VITE_REGEX_UPPERCASE; // At least one uppercase letter
  const lowerCaseRegEx = import.meta.env.VITE_REGEX_LOWERCASE; // At least one lowercase letter
  const digitRegEx = import.meta.env.VITE_REGEX_DIGITS; // At least one digit
  const specialCharRegEx = import.meta.env.VITE_REGEX_SPECIALCHAR; // At least one special character

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

function verifyPancardString(error = {}, values) {
  const panCardRegex = import.meta.env.VITE_REGEX_PANNO; // PAN card validation regex
  const panCardNumber = values?.panNumber?.trim(); // Access and trim the PAN card value

  if (!panCardNumber) {
    error.panCard = toast.error("PAN card number is required.");
  } else if (!panCardRegex.test(panCardNumber)) {
    error.panCard = toast.error("Invalid PAN card format.");
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
    return verifyEmailString({}, values);
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
  if(values.email) {
      return verifyEmailString({}, values);
  } else if(values.phoneNo) {
      return userPhonenoVerify({}, values);
  } else {
      return verifyNameString({}, values);
  }
}

export async function pancardValidation(values) {
  // const error = verifyNameString({}, values);
    return verifyPancardString({}, values);
}
