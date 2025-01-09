import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import UserModel from '../../../server/model/User.model';

axios.defaults.baseURL = "http://localhost:8080";

// ** Make API Requests **

// ** to get the user from token **

export async function getUsername() {
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find token");

    let decode = jwtDecode(token);
    return decode;
}

// "" google authentication ""
export async function signupWithGoogle(){
  window.location.href = "http://localhost:8080/v1/api/auth/google";
  // const result = await axios.get('/v1/api/auth/google');
  // console.log("result", result);
  signupWithGoogleCallback()
}
export async function signupWithGoogleCallback() {
  // window.location.href = "http://localhost:8080/v1/api/auth/google";
  const result = await axios.get('/v1/api/auth/google/callback');
  console.log("result", result);
}
// ** auhenticate function **
export async function authenticate(email) {
    try {
        const data = await axios.post('/v1/api/authenticate', {email});
        const user = await axios.get(`/v1/api/user/email/${email}`);
        console.log(data.data, user.data);
        data.data = user.data;
        return data;
    } catch (error) {
        return (error);
    }
};

// export async function googleCallbacck() {
  // fetch("/v1/api/auth/google/callback")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Store user data in local storage
  //     localStorage.setItem("userProfile", JSON.stringify(data.profile));
  //     // Redirect to the main app
  //     window.location.href = "/"; // Replace '/' with your main app route
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching user profile:", error);
  //   });
// }

// ** fetch user **
export async function fetchAuthorizedUser() {
  try {
    const response = await axios.get(`/v1/api/users`, {withCredentials: true});
    console.log("res", response.data);
    return response;
  } catch(error) {
    console.error(error);
  }
}
// ** get the user details **
export async function getUserDetail({ username }) {

  try {
    const { data } = await axios.get(`/v1/api/user/${username}`);
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
        const {data: {msg, userId}, status} = await axios.post(`/v1/api/register`, credential);

        // console.log("data" ,msg, userId);
        
        let {fullname, email} = credential;
        // ** send email **
        // if(status === 201){
        //     await axios.post(`/v1/api/registerMail`, {fullname, useremail:email, text:msg})
        // }
        return {msg: msg, userId: userId};
    }catch(error){
        console.error(
          "Error in registerUser:",
          error.response ? error.response.data : error.message
        );
        return Promise.reject(error.response ?  error.response.data : error.message);

    }
}

// ** login function **
export async function loginUser({ credential }) {
    try {
        // console.log("Received credential:", credential);
        const  {data}  = await axios.post(`/v1/api/login`, credential);
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


// "" recovery email to update password ""
export async function verifyEmailAndSendOTP(email) {
  try {
    if(!email){
      return {msg: "Invalid email address"};
    }
    const response = await axios.post(`/v1/api/recovery`, {email});
    // console.log("res", response);
    return  response.data;


  } catch (error) {
    
  }
}


// ** generate OTP **
export async function generateOTP(email, fullname){
    try{
        const {data: {code}, status} =  await axios.get(`/v1/api/generate-Otp`, {params: {email}});
        console.log("code : ", code, status);
        // send mail with otp
        if(status === 201){

            // let {data: {email}} = await getUserDetail({fullname});

            let text = `Your Password Recovery OTP is ${code}. Verify and Recover your Password`;
            let subject = "Password Recovery OTP";
            await axios.post(`/v1/api/registerMail`, {username: fullname, useremail: email, text, subject})
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
export async function verifyOtp(values){
    try{
      console.log("vv", values);
      
        const response = await axios.post(`/v1/api/verify-Otp`, values);
        console.log(response);
        return response.data;
    }catch(error){
        return Promise.reject(error);
    }
}

// ** reset password **
export async function resetPassword(values){
    console.log(values);
    try{
      const response = await axios.put('v1/api/resetPassword', values);
      console.log(response);
      return response.data;
    }
    catch(error){
        return Promise.reject({error});
    }
}
// Update the profile info
export async function updateProfileInfo(values, user) {
  try {
    console.log("values updated", user, values);
    const response = await axios.put('v1/api/updateUserProfile', {values, user}, {withCredentials: true});

    return {
      message: "Profile information updated successfully",
      data: response.data,
    };
  } catch (error) {
    return Promise.reject({ error });
  }
}

// Update the profile info
export async function editAddress(values, mode) {
  try {
    // Fetch the user ID asynchronously
    console.log("formData", values, mode);
    // const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    // const userId = userIdInfo.userId;
    // console.log(userId);

    // Make the PUT request with the user ID
    const response = await axios.post(
      `v1/api/manageAddress`,
      { values, mode },
      { withCredentials: true }
    );

    return {
      message: "Address information Added successfully",
      data: response.data,
    };
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function fetchAddress(){
    try {
      const response = await axios.get(`v1/api/addresses`, {withCredentials: true});
      // console.log("response : ", response);
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
}
export async function deleteAddressById(id) {
  try {
    const response = await axios.delete(`v1/api/address/${id}`, {withCredentials: true});
      console.log("response : ", response);
    return response.data;
  } catch (error) {
    console.error("Error deletion address:", error);
  }
};


export async function getWishlists(){
  try {
    const response = await axios.get(`v1/api/getWishlists`, {withCredentials: true});
      console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
};

export async function addToWishlists(id) {
  try {
    const response = await axios.post(`v1/api/addItemWistlists`, {id}, {withCredentials: true});
    console.log(""response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export async function removeFromWishlists(id) {
  try {
    const response = await axios.delete(`v1/api/removeItemWishlists`,{id} , {withCredentials: true});
    console.log(response);
    return response.data;
  } catch (error) {
    // Throw the error with the error message from the response data
    throw new Error(`Error: ${error.response.data.message}`);
  }
};


export async function addPanCard(values) {
  try {
    const response = await axios.post(`v1/api/pancardvalidation`,{values}, {withCredentials:true});
      console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("Error in Uploading:", error);
  }
}

// pan card details
export async function getPancardDetails() {
  try{
    const response = await axios.get(`v1/api/getPancardDetails`, {withCredentials:true});
    return response.data;
  } catch(error) {
    console.log("Error in GetPancardDetails:", error);
    
  }
}

export async function saveProductsToServer(products){
  console.log(products);
  try {
    const response = await axios.post("v1/api/products", 
      {body: products },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to save products to the server. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error saving products to server:", error);
  }
}

export async function fetchProducts() {
  try {
    const response = await axios.get("v1/api/getProducts");
    return response.data || []; // Ensure an array is returned
  } catch (error) {
    console.error("Error in Getting Product data:", error);
    return []; // Return an empty array in case of error
  }
}


export async function fetchProductsById(id) {
  try {
    const response = await axios.get(`v1/api/getProductsById?Id=${id}`);
    return response;
  } catch (error) {
    console.error("Error in Getting Product data:", error);
  }
}

export async function fetchSearchProducts(searchInput){
  try{
    const response = await axios.get(`v1/api/getProducts/search?query=${searchInput}`);
    console.log(response);
    return response;
  } catch(error){
    console.error("Error fetching products: ", error);
  }
}