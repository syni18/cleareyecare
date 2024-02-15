import axios from 'axios';
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:8080"

// ** Make API Requests **

// ** to get the user from token **

export async function getUsername() {
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find token");

    let decode = jwtDecode(token);
    // console.log(decode);
    const username = decode.username;
    // console.log(username);
    return username;
}

// ** auhenticate function **
export async function authenticate({email) {
    console.log(email);
    try {
        const data = await axios.post('/v1/api/authenticate',  {email});
        console.log(data.data);
        return data;
    } catch (error) {
        throw new Error("Email does not exist");
    }
};

// ** get the user details **
export async function getUserDetail({ fullname }) {

  try {
    const { data } = await axios.get(`/v1/api/user/${fullname}`);
    // console.log("client helper:", data);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match...!" };
  }
}

// ** register user function **
export async function registerUser({credential}){
    try{
        console.log("Received credential:", credential);
        const {data: {msg}, status} = await axios.post(`/v1/api/register`, credential);

        let {fullname, email} = credential;
        // ** send email **
        if(status === 201){
            await axios.post(`/v1/api/registerMail`, {fullname, useremail:email, text:msg})
        }
        return Promise.resolve(msg);
    }catch(error){
        console.error(
          "Error in registerUser:",
          error.response ? error.response.data : error.message
        );
        return Promise.reject({error})
    }
}

// ** login function **
export async function loginUser({ credential }) {
    try {
        console.log("Received credential:", credential);
        const { data } = await axios.post(`/v1/api/login`, credential);
        console.log("ResponseData: ", data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Password doesn't match...!");
    }
};



// ** update user function **
export async function updateUser(response){
    try{ 
        const token = await localStorage.getItem('token');
        const data = await axios.put(`/v1/api/updateuser`, response, {heaader: {"Authorization": `Bearer ${token}`}});

        return Promise.resolve({data})
    }
    catch(error){
        return Promise.reject({error: "Couldn't Update Profile...!"})
    }
}

// ** generate OTP **
export async function generateOTP(fullname){
    try{
        const {data: {code}, status} =  await axios.get(`/v1/api/generate-Otp`, {params: {fullname}});
        console.log("code : ", code, status);
        // send mail with otp
        if(status === 201){

            let {data: {email}} = await getUserDetail({fullname});

            let text = `Your Password Recovery Otp is ${code}. Verify and Recover your Password`;
            await axios.post(`/v1/api/registerMail`, {username: fullname, useremail: email, text, subject: "Password Recovery OTP"})
            return Promise.resolve(code);
        }
        else {
            return Promise.reject(
              new Error(`Failed to generate OTP. Status: ${status}`)
            );
        }
    }
    catch(error){
        console.error("Error in generateOTP:", error);
        return Promise.reject({error});
    }
}

// ** VerifyOtp **
export async function verifyOtp({code}){
    try{
        const {data , status} = await axios.get(`/v1/api/verify-Otp`, {params: { code }});
        console.log(data, status);
        return {data, status}
    }catch(error){
        return Promise.reject(error);
    }
}

// ** reset password **
export async function resetPassword({fullname, password}){
    try{
        const {data, status} = await axios.put('v1/api/resetPassword', {fullname, password});
        return Promise.resolve({data, status});
    }
    catch(error){
        return Promise.reject({error});
    }
}