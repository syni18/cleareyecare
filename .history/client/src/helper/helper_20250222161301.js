import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

// ** Make API Requests **


// "" google authentication ""
export async function signupWithGoogle(){
  window.location.href =
    `${import.meta.env.VITE_SERVER_URL}/v1/api/auth/google`;
  signupWithGoogleCallback()
}
export async function signupWithGoogleCallback() {
  await axios.get('/v1/api/auth/google/callback');
}


// ** fetch user **
export async function fetchAuthorizedUser() {
  try {
      return await axios.get(`/v1/api/users`, {withCredentials: true});
  } catch(error) {
    console.error(error);
  }
}


// ** register user function **
export async function registerUser({credential}){
    try{
        const {data: {msg, userId}} = await axios.post(`/v1/api/register`, credential);
        return {msg: msg, userId: userId};
    }catch(error){
        console.error(
          "Error in registerUser:",
          error.r ? error.r.data : error.message
        );
        return Promise.reject(error.r ?  error.r.data : error.message);
    }
}


// ** login function **
export async function loginUser({ credential }) {
    try {
        const  {data}  = await axios.post(`/v1/api/login`, credential);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Password doesn't match...!");
    }
}


// "" recovery email to update password ""
export async function verifyEmailAndSendOTP(email) {
  try {
    if(!email){
      return {msg: "Invalid email address"};
    }
    const r = await axios.post(`/v1/api/recovery`, {email});
    return  r.data;
  } catch (error) {
      return Promise.reject(
          new Error(`Failed to Send OTP...! ${error}`)
      );
  }
}


// ** generate OTP **
export async function generateOTP(email, fullname){
    try{
        const {data: {code}, status} =  await axios.get(`/v1/api/generate-Otp`, {params: {email}});
        console.log("code : ", code, status);
        // send mail with otp
        if(status === 201){
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
        const r = await axios.post(`/v1/api/verify-Otp`, values);
        return r.data;
    }catch(error){
        return Promise.reject(error);
    }
}


// ** reset password **
export async function resetPassword(values){
    try{
      const r = await axios.put('v1/api/resetPassword', values);
      return r.data;
    }
    catch(error){
        return Promise.reject({error});
    }
}


// Update the profile info
export async function updateProfileInfo(values, user) {
  try {
    const r = await axios.put('v1/api/updateUserProfile', {values, user}, {withCredentials: true});
    return {
      message: "Profile information updated successfully",
      data: r.data,
    };
  } catch (error) {
    return Promise.reject({ error });
  }
}


// Update the profile info
export async function editAddress(values, mode) {
  try {
    const r = await axios.post(
      `v1/api/manageAddress`,
      { values, mode },
      { withCredentials: true }
    );

    return {
      message: "Address information Added successfully",
      data: r.data,
    };
  } catch (error) {
    return Promise.reject({ error });
  }
}


export async function fetchAddress(){
    try {
      const r = await axios.get(`v1/api/addresses`, {withCredentials: true});
        console.log("fg", r);
      return r.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
}


export async function deleteAddressById(id) {
  try {
    const r = await axios.delete(`v1/api/address/${id}`, {withCredentials: true});
    return r.data;
  } catch (error) {
    console.error("Error deletion address:", error);
  }
}


export async function setDefaultAddress(id) {
  try {    
    const r = await axios.put(`v1/api/setDefualtAddress`, {id}, {withCredentials: true});
    return r.data;
  } catch (error) {
    console.error("Error setting default address:", error);
  }
}


export async function getWishlists(location){
  try {
    const r = await axios.get(`v1/api/getWishlists`, {params: {location},withCredentials: true});
    return r.data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
  }
}


export async function addToWishlists(id) {
  try {
    const r = await axios.post(`v1/api/addItemWistlists/${id}`,{}, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    throw new Error(error.r.data.message);
  }
}


export async function removeFromWishlists(id) {
  try {
    const r = await axios.delete(`v1/api/removeItemWishlists/${id}`, {withCredentials: true});
    return r.data;
  } catch (error) {
    // Throw the error with the error message from the r data
    throw new Error(`Error: ${error.r.data.message}`);
  }
}


export async function addPanCard(values) {
  try {
    const r = await axios.post(`v1/api/pancardvalidation`,{values}, {withCredentials:true});
    return r.data;
  } catch (error) {
    console.error("Error in Uploading:", error);
  }
}


// pan card details
export async function getPancardDetails() {
  try{
    const r = await axios.get(`v1/api/getPancardDetails`, {withCredentials:true});
    return r.data;
  } catch(error) {
    console.log("Error in GetPancardDetails:", error);
    
  }
}

export async function saveProductsToServer(products){
  try {
    const r = await axios.post("v1/api/products", 
      {body: products },
    );
    if (!r.ok) {
      throw new Error(
        `Failed to save products to the server. Status: ${r.status}`
      );
    }
  } catch (error) {
    console.error("Error saving products to server:", error);
  }
}


export async function fetchProducts() {
  try {
    const r = await axios.get("v1/api/getProducts");
    return r.data || []; // Ensure an array is returned
  } catch (error) {
    console.error("Error in Getting Product data:", error);
    return []; // Return an empty array in case of error
  }
}


export async function fetchProductsById(id) {
  try {
    const r = await axios.get(`v1/api/getProductsById?id=${id}`);
    return r.data;
  } catch (error) {
    console.error("Error in Getting Product data:", error);
  }
}

export async function fetchSearchProducts(searchInput){
  try {
    const r = await axios.get(`v1/api/getProducts/search?query=${searchInput}`);
    return r.data;
  } catch(error){
    console.error("Error fetching products: ", error);
  }
}


export async function getCartItems() {
  try {
    const r = await axios.get("v1/api/getItemsInCart", {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error("Error fetching cart items: ", error);
  }
}


export async function addProductToCart(product) {
  try {
    const r = await axios.post("v1/api/addProductToCart", {product}, {
      withCredentials: true,
    });
    return r.data
    
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
}

export async function removeProductFromCart(product) {
  try {
    const r = await axios.delete(
      "v1/api/removeProductFromCart",
      {
        data: { product },
        withCredentials: true,
      }
    );
    return r.data;
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
}


export async function editItemsInCart(values) {
  try {
    console.log("values", values);
    const r = await axios.put("v1/api/updateItemsInCart", values, {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error("Error editing cart items: ", error);
  }
}


export async function getCouponsToShow() {
  try {
    const r = await axios.get("v1/api/getCoupons", {
      withCredentials: true,
    });
    return r.data;
  } catch (error) {
    console.error("Error fetching coupons: ", error);
  }
}


export async function postReviewProduct(values) {
  try {
    const r = await axios.post("v1/api/reviewProduct", {values}, {withCredentials: true});
    return r.data;
  } catch (error) {
    console.error("Error in adding product review: ", error);
  }
}


export async function getProductReviews(id) {
  try {
    const r = await axios.get(`v1/api/getProductReviews?id=${id}`, {withCredentials: true});
    return r.data;
  } catch (error) {
    console.error("Error in fetching product reviews: ", error);
  }
}

export async function createOrderCF() {
  try {
    const r = await axios.post("v1/api/create-order", {}, {withCredentials: true});
    return r.data;
  } catch (error) {
    console.error("Error in creating Order: ", error);
  }
}

