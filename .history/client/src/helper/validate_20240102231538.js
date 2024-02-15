import toast from "react-hot-toast";
import { authenticate } from "./helper";

// validate username
function usernameVerify(error = {}, values){
    const NameRegEx = /[$&+,:;=?@#|'<>.-^*()%!]/;
    if(!values.fullname){
        error.fullname = toast.error("name Required!");
    }else if(!NameRegEx.test(values.fullname)){
        error.fullname = toast.error("Provide a correct name");
    }
    return error;
}


// validate emails
function useremailVerify(error={}, values){
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
    const phno = values.phoneno;
    const str = JSON.stringify(phno);
    if(!values.phoneno){
        error.phoneno = toast.error("Phone number Required!");
    }
    else if(str.length !== 10){
        error.phoneno = toast.error("Phone number Invalid");
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
    const errors = useremailVerify({}, values);
    userpasswordVerify(errors, values);

    if(values.email){
        //check user exist or not
        const {status} = await authenticate(values.email);
        if(status !== 200) {
            errors.exist = toast.error('User doesn\'t Exist');
        }
    }

    return errors;
}

// validate register form
export async function registerValidate(values){
    const errors = usernameVerify({}, values);
    useremailVerify(errors,values);
    userpasswordVerify(errors, values);

    return errors;
}


// validate email form for recovery
export async function validateEmail(values){
    const errors
}