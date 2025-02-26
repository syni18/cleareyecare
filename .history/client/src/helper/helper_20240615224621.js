import axios from 'axios';
import { jwtDecode } from "jwt-decode";

axios.defaults.baseURL = "http://localhost:8080"

// ** Make API Requests **

// ** to get the user from token **

export async function getUsername() {
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find token");

    let decode = jwtDecode(token);
    return decode;
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
        // console.log("Received credential:", credential);
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
        // console.log("Received credential:", credential);
        const  {data}  = await axios.post(`/v1/api/login`, credential);
        // console.log("ResponseData: ", data);
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
export async function verifyOtp({code}){
    try{
        const {data , status} = await axios.get(`/v1/api/verify-Otp`, {params: { code }});
        // console.log(data, status);
        return {data, status}
    }catch(error){
        return Promise.reject(error);
    }
}

// ** reset password **
export async function resetPassword({useremail, password}){
    console.log(useremail, password);
    try{
        const {data, status} = await axios.put('v1/api/resetPassword', {useremail, password});
        // console.log(data, status);
        return Promise.resolve({data, status});
    }
    catch(error){
        return Promise.reject({error});
    }
}
// Update the profile info
export async function updateProfileInfo({ credential }) {
  try {
    // Fetch the user ID asynchronously
    const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    const userId = userIdInfo.userId;
    console.log(userId);

    // Make the PUT request with the user ID
    const response = await axios.put(`v1/api/updateUser`, {credential, userId});

    return {
      message: "Profile information updated successfully",
      data: response.data,
    };
  } catch (error) {
    return Promise.reject({ error });
  }
}

// Update the profile info
export async function addAddress(formData, mode) {
  try {
    // Fetch the user ID asynchronously
    // console.log(formData);
    const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    const userId = userIdInfo.userId;
    console.log(userId);

    // Make the PUT request with the user ID
    const response = await axios.post(`v1/api/newAddress`, {formData, userId ,mode});

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
      // Fetch the user ID asynchronously
      // console.log(formData);
      const userIdInfo = await getUsername();

      // Once the promise is fulfilled, extract the userId
      const userId = userIdInfo.userId;
      const response = await axios.get(`v1/api/savedaddress?userId=${userId}`);
    //   console.log("response : ", response);
      return response;
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
}
export async function deleteSavedAddress(addressId) {
  try {
    // Fetch the user ID asynchronously
    // console.log(formData);
    const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    const userId = userIdInfo.userId;
    const response = await axios.delete(`v1/api/deleteSavedAddress`, {
      data: {
        userId: userId,
        addressId: addressId,
      },
    });
      // console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("Error deletion address:", error);
  }
};

export async function addToWatchlistApi(productId) {
  try {
    // Fetch the user ID asynchronously
    // console.log(formData);
    const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    const userId = userIdInfo.userId;
    console.log("user", userId);
    const response = await axios.post(`v1/api/addTowatchlist`, {
        productId,
        userId,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export async function fetchWatchlistItem(){
  try {
    // Fetch the user ID asynchronously
    // console.log(formData);
    const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    const userId = userIdInfo.userId;
    const response = await axios.get(`v1/api/getWatchlist?userId=${userId}`);
      console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
}
export async function removeFromWatchlistApi(productId) {
  try {
    // Fetch the user ID asynchronously
    const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    const userId = userIdInfo.userId;

    const response = await axios.delete(`v1/api/users/${userId}/watchlist/${productId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    // Throw the error with the error message from the response data
    throw new Error(`Error: ${error.response.data.message}`);
  }
};


export async function addPanCard(panData) {
  try {
    // Fetch the user ID asynchronously
    // console.log(formData);
    const userIdInfo = await getUsername();

    // Once the promise is fulfilled, extract the userId
    const userId = userIdInfo.userId;
    const response = await axios.post(`v1/api/addPANCard`,{panData, userId});
      console.log("response : ", response);
    return response;
  } catch (error) {
    console.error("Error in Uploading:", error);
  }
}

export async function saveProductsToServer(products){
  // console.log(products);
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

export async function fetchProducts(){
  try{
    const response = await axios.get("v1/api/getProducts");
    return response;
  }catch (error) {
    console.error("Error in Getting Product data:", error);
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