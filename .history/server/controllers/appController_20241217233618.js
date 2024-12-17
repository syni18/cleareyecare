import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import ENV from "../router/config.js";
import otpGenerator from "otp-generator";
import { v4 as uuidv4 } from "uuid";
import ProductModel from "../model/Product.model.js";
import generateJWT from "../utils/generateJWT.js";
import passport from "passport";
import setTokenCookies from "../utils/setTokenCookies.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import RefreshTokenModel from "../model/RefreshToken.model.js";
import generatorOTP from "../utils/generatorOTP.js";
import RecoveryOTPModel from "../model/RecoveryOTP.model.js";
import { otpMessage } from "../utils/designEmail.js";
import { sendEmail } from "./mailer.js";
import AddressModel from "../model/Address.model.js";

// ** Global variables **
let sessionStore = {}; // Simple in-memory store (replace with Redis or DB for production)

//  ** middleware for verify user **
export async function verifyUser(req, res, next) {
  try {
    const { email } = req.body;

    // check the user existance
    let exist = await UserModel.findOne({ email });
    if (!exist) return res.status(404).send({ error: "Can't find User" });
    // return res.status(200).send(exist);
    console.log("app-Controller: ", exist);
    next();
  } catch (error) {
    return res.status(404).send({ error: "Authentication Error" });
  }
}

//
export async function getAuthGoogle(req, res, next) {
  try {
    // Initiate Google authentication using Passport
    passport.authenticate("google", {
      session: false,
      scope: ["profile", "email"],
    })(req, res, next);
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(500).json({ error: "Failed to authenticate user with Google" });
  }
}

//
export async function getCallbackGoogle(req, res, next) {
  passport.authenticate("google", { session: false, failureRedirect: "/login" }, 
    (err, user, info) => {      
      if (err) {
        return next(err); // Handle errors from passport
      }
      if (!user) {
        return res.redirect("/login"); // Handle case where authentication fails
      }

      // Access user details
      const {
        accessToken,
        refreshToken,
        accessTokenExpiry,
        refreshTokenExpiry,
      } = user; // Ensure `user` contains these fields

      // Set token cookies
      setTokenCookies(res, accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry);

      // Redirect to the frontend
      res.redirect("http://localhost:5173/");
    }
  )(req, res, next); // Pass req, res, and next to the passport middleware
}


// generate and set new access token  using Refresh token
export async function getNewAccessToken(req, res) {
  try {
    const {
      newAccessToken,
      newRefreshToken, 
      newAccessTokenExpiry, 
      newRefreshTokenExpiry
    } = await refreshAccessToken(req, res);
    // set cookies new
    setTokenCookies(res, newAccessToken, newRefreshToken, newAccessTokenExpiry, newRefreshTokenExpiry);
    res.json({ msg: "New access token generated successfully." });
} catch(err) {
  console.error("Error: ", err);
  return res.status(500).json({ msg: "Failed to generate new access token." });
}
}

// POST: http://localhost:8080/api/register
export async function register(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check for existing user
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return res
        .status(400)
        .json({ status: false, msg: "Email address already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database directly
    const result = await new UserModel({
      firstname,
      lastname,
      fullname: lastname ? `${firstname} ${lastname}` : firstname,
      email,
      decryptPassword: password, // Consider removing this for security reasons
      password: hashedPassword,
      createdAt: new Date(),
      lastLoginAt: null,
      isActive: true,
      isAdmin: false,
    }).save();

    res.status(201).json({
      status: true,
      userId: result._id,
      msg: "Registered successfully",
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({status: false, msg: "Internal server error", details: error.message });
  }
}


// POST: http://localhost:8080/api/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const isUserExist = await UserModel.findOne({ email });

    if (!isUserExist) {
      return res.status(404).json({ status: false, msg: "Invalid Email Or Password." });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, isUserExist.password);

    if (!passwordMatch) {
      return res.status(400).json({ status: false, msg: "Invalid Email Or Password." });
    }

    // Create JWT token
    const { 
      accessToken,
      refreshToken, 
      accessTokenExpiry, 
      refreshTokenExpiry 
    } = await generateJWT(isUserExist);

    // Set cookies (uncomment and implement setTokenCookies if needed)
    setTokenCookies(res, accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry);

    // Update lastLoginAt field to current date and time
    isUserExist.lastLoginAt = new Date();
    await isUserExist.save(); // Save the updated user
    
    // Return successful login response with token
    return res.status(200).json({
      status: true,
      msg: "Login successful",
      username: isUserExist.fullname,
      email: isUserExist.email,
      accessToken,
      refreshToken,
      accessTokenExpiry,
      refreshTokenExpiry,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({status: false, msg: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    const refreshToken = req.cookies.refreshToken;
    await RefreshTokenModel.findOneAndUpdate(
      { token: refreshToken },
      { $set: {blacklist: true }}
    );
    //clear cookies
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');

    return res.status(200).json({
      status: true,
      msg: "Logout successful",
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({status: false, msg: "Logout failed", error: error.message});
  }
}

// GET: http://localhost:8080/api/user/example123
export async function getUser(req, res) {
  console.log(" re", req.user);
  res.send({user: req.user});
  // const { username } = req.params;

  // try {
  //   if (!username) return res.status(400).send({ error: "Invalid Name" });

  //   const user = await UserModel.findOne({ username }).exec();

  //   if (!user) {
  //     return res.status(404).send({ error: "User not found" });
  //   }

  //   const { password, ...rest } = Object.assign({}, user.toJSON());

  //   // Log user data for debugging
  //   // console.log("User Data:", rest);

  //   return res.status(200).send(rest);
  // } catch (error) {
  //   console.error("Error:", error);
  //   return res.status(500).send({ error: "Internal Server Error" });
  // }
}

// GET: http://localhost:8080/api/user/email
export async function getUserByEmail(req, res) {
  const { email } = req.params;
  console.log(email);

  try {
    if (!email) return res.status(400).send({ error: "Invalid email" });

    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const { password, ...rest } = Object.assign({}, user.toJSON());

    // Log user data for debugging
    // console.log("User Data:", rest);

    return res.status(200).send(rest);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

// ** PUT: http://localhost:8080/api/updateuser **
export async function updateUserProfile(req, res) {
  try {
    const data = req.body;
    const user = req.user;

    if (!data || data.user._id !== user.userId) {
      console.log("Invalid", data.user._id, user._id);
      
      return res.status(400).send({ error: "Invalid request" });
    }

    const { firstname, lastname, email, phoneNo } = data.values;

    // Check if any field has changed
    if (
      user.firstname === firstname &&
      user.lastname === lastname &&
      user.email === email &&
      user.phoneNo === phoneNo
    ) {
      console.log("Field has no changed");
      
      return res.status(200).send({ msg: "No changes detected" });
    }

    // Construct an object to hold the fields to be updated
    const updateFields = {};

    if (firstname !== user.firstname || lastname !== user.lastname) {
      updateFields.firstname = firstname;
      updateFields.lastname = lastname;
      updateFields.fullname = `${firstname} ${lastname}`;
    }

    if (email !== user.email) updateFields.email = email;
    if (phoneNo !== user.phoneNo) updateFields.phoneNo = phoneNo;

    console.log("updateFields", updateFields);
    
    // Find and update the user
    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      updateFields,
      {
        new: true,
      }
    );
    console.log("Updated user", updatedUser);
    

    if (updatedUser) {
      return res
        .status(200)
        .send({ msg: "User  profile updated successfully!", updatedUser });
    } else {
      return res.status(404).send({ error: "User  not found!" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

// ** GET: http://localhost:8080/api/generate-Otp **
export async function generateOTP(req, res) {
  req.app.locals.OTP = await otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  res.status(201).send({ code: req.app.locals.OTP });
}

// ** GET: http://localhost:8080/api/verify-Otp **
export async function verifyOTP(req, res) {
  try {
    const { email, otp, userId } = req.body;
    // console.log("re", req.body);
    
    const isUserExist = await UserModel.findOne({ email: email});
    const isOTPExist = await RecoveryOTPModel.findOne({userId: userId});
    // console.log("tt", isUserExist, isOTPExist);
    
    if (isUserExist && isOTPExist && isOTPExist.userId === userId) {
      if (!isOTPExist.otp === otp.join("")) {
        return res.status(400).send({ error: "Invalid OTP" });
      }
    }
    // delete otp from RecoveryOtpModel
    await RecoveryOTPModel.deleteOne({ userId: userId });

    const sessionId = Date.now().toString(); // Generate session ID
    sessionStore[sessionId] = { isValid: true };

    return res.status(200).send({ msg: `OTP verified successfully!`,SID: sessionId , userId: isUserExist._id});
  } catch (error) {
    return res.status(500).send({ msg: "Internal Server Error" });
  }
}

// ** GET: http://localhost:8080/api/createResetSession **
export async function createResetSession(req, res) {
  if (req.app.locals.resetSession) {
    return res.status(201).send({ flag: req.app.locals.resetSession });
  }
  return res.status(440).send({ error: "Session expired!" });
}
// "" check email and send OTP ""
export async function recovery(req, res, next) {
  try {
    const { email } = req.body;
    const isUserExist = await UserModel.findOne({ email });
    if (!isUserExist) {
      return res
        .status(400)
        .json({ status: false, msg: "Invalid email address." });
    }
    const otp = generatorOTP();
    console.log("otp", otp);
    
    await RecoveryOTPModel.findOneAndUpdate(
      { userId: isUserExist._id }, // Search condition
      { otp, createdAt: Date.now() }, // Update data
      { upsert: true, new: true } // Upsert and return the updated document
    );

    // send email notification
    // const emailBody = otpMessage(isUserExist.fullname, otp);
    // const subject = `Reset Password`
    // await sendEmail(email, subject, emailBody);
    return  res.status(201).send({status: true ,userId: isUserExist._id, msg: "OTP sent to your email." });    
  } catch (error) {
    return res
      .status(500)
      .json({
        status: false,
        msg: "Something went wrong.",
        error: error.message,
      });
  }
}
// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    const { id, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).send({status: false, msg: "Password does not match" });
    }

    const isUserExist = await UserModel.findById(id);

    if (!isUserExist) {
      return res.status(404).send({status: false, msg: "Unauthorized access attempt" });
    }

    // Update the user's password
    (user.password = await bcrypt.hash(password, 10));; // Directly update the user's password
    user.decryptPassword = password;
    await user.save(); // Save the updated user

    return res.status(200).send({status: true, msg: "Password updated successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error); // Log the error for debugging
    return res.status(500).json({status: false, msg: "Internal server error" });
  }
}

export async function passwordResetSession (req, res, next) {
  console.log("ress", req.session.resetPassword);
  
  if (req.session.resetPassword) {
    return res.status(200).send({ flag: req.session.resetPassword });
  } else {
    res.status(403).send("Access Denied. Please verify your OTP first.");
  }
};

// API to validate session
export async function passwordValidateSession (req, res) {
  const { sessionId } = req.query;
  if (sessionStore[sessionId]?.isValid) {
    res.status(200).json({ isValid: true });
  } else {
    res.status(401).json({ isValid: false });
  }
};

export async function passwordLogoutSession (req, res) {
  const { sessionId } = req.body;
  if (sessionStore[sessionId]) {
    delete sessionStore[sessionId]; // Remove the session
    return res.status(200).json({ message: "Session invalidated" });
  }
  res.status(400).json({ message: "Session not found" });
};


// Add new address for delivery
// ** POST : http://localhost:8080/api/newAddress   */
export async function manageAddress(req, res) {
  try {
    const { value, mode } = req.body;
    const user = req.user;

    const isUserExist = await UserModel.findById(user.userId);
    if (!isUserExist) {
      return res.status(401).json({ error: "Unauthorized access attempt" });
    }
    if(mode === "create" ) {
      const address = {
        id: uuidv4(), // Generate unique ID for the address
        ...value,
      };
      const newaddress = await new AddressModel({
        userId: user.userId,
        defaultAddress: address,
        address: [address],
      }).save();

      res.status(201).json({
        status: true,
        address: newaddress,
        msg: "Address added successfully",
      });
    } else {
      const isAddressExist = await AddressModel
    }
    //   if (mode === "edit" && body.addressId) {
    //     // Update existing address
    //     const updatedAddress = await UserModel.findOneAndUpdate(
    //       { _id: data.userId, "address.addressId": body.addressId },
    //       {
    //         $set: {
    //           "address.$.fullName": body.fullName,
    //           "address.$.phoneNumber": body.phoneNumber,
    //           "address.$.pincode": body.pincode,
    //           "address.$.locality": body.locality,
    //           "address.$.address": body.address,
    //           "address.$.cityDistrictTown": body.cityDistrictTown,
    //           "address.$.state": body.state,
    //           "address.$.landmark": body.landmark,
    //           "address.$.altMobile": body.altMobile,
    //           "address.$.addressType": body.addressType,
    //         },
    //       },
    //       { new: true }
    //     );

    //     if (updatedAddress) {
    //       return res
    //         .status(200)
    //         .send({ msg: "Address Updated!", updatedAddress });
    //     } else {
    //       return res.status(404).send({ error: "Address Not Found!" });
    //     }
    //   } else {
    //     // Add new address
    //     const newAddress = {
    //       addressId: uuidv4(), // Generate unique ID for the address
    //       ...body,
    //     };

    //     const user = await UserModel.findByIdAndUpdate(
    //       { _id: data.userId },
    //       { $push: { address: newAddress } },
    //       { new: true }
    //     );

    //     if (user) {
    //       return res.status(200).send({ msg: "Address Added!", user });
    //     } else {
    //       return res.status(404).send({ error: "User Not Found!" });
    //     }
    //   }
    // } else {
    //   return res.status(400).send({ error: "Missing User ID" });
    // }
    return;
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

// Get saved addresses for a user
export async function getSavedAddress(req, res) {
  try {
    const { userId } = req.query; // Assuming userId is provided as a query parameter
    // console.log("userId: ",userId);

    // Fetch user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the addresses array
    res.status(200).json({ addresses: user.address });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete an address for a user
export async function deleteAddress(req, res) {
  try {
    const { userId, addressId } = req.body; // Assuming userId and addressId are provided in the request body
    // console.log(req.body);

    // Fetch user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Filter out the address to be deleted
    user.address = user.address.filter(
      (address) => address.addressId !== addressId
    );

    // Save the updated user object
    await user.save();

    // Return success message
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addPANCard(req, res) {
  try {
    const { userId, panData } = req.body;
    console.log(userId, panData);
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not Found." });
    }
    // Check if user already has PAN card details
    if (user.panCard) {
      return res
        .status(400)
        .json({ message: "PAN card details already exist for this user." });
    }
    // Assuming panData contains fullName, panNumber, declaration, and panImages
    const { fullName, panNumber, declaration, panImage } = panData;

    // Construct PAN card object
    const panCard = {
      fullName,
      panNumber,
      declaration,
      panImage,
    };

    // Add PAN card details to the user's profile
    user.panCard = panCard;

    // Save the updated user object
    await user.save();

    return res
      .status(200)
      .json({ message: "PAN card information added successfully" });
  } catch (error) {
    console.error("Error adding PAN card information:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addToWatchlist(req, res) {
  try {
    const { userId, productId } = req.body;

    // Validate the presence of userId and productId
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: "userId and productId are required" });
    }

    // Ensure userId and productId are strings
    if (typeof userId !== "string" || typeof productId !== "string") {
      return res
        .status(400)
        .json({ message: "userId and productId must be strings" });
    }

    // Check if user exists
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's watchlist
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { watchlist: { productId } } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeFromWatchlist(req, res) {
  try {
    const { userId, productId } = req.params;
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the item from the watchlist based on productId
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { watchlist: { productId: productId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Failed to update user watchlist" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error removing item from watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getWatchlist(req, res) {
  try {
    // const { userId } = req.query; // Assuming userId is provided as a query parameter
    // console.log("userId: ", userId);

    // // Fetch user by userId
    // const user = await UserModel.findById(userId);

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // console.log("userWatchlist", user.watchlist.length);
    // // Return the addresses array
    res.status(200).json({ watchlist: "user.watchlist" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// this is related to product Database schema
export async function products(req, res) {
  try {
    const productsData = req.body; // Assuming products are sent in the body of the request
    console.log(productsData.body.length);
    const savedProducts = await ProductModel.insertMany(productsData.body);
    res.status(201).json(savedProducts);
  } catch (error) {
    console.error("Error saving products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProducts(req, res) {
  try {
    // Fetch all products from the database
    const products = await ProductModel.find();

    // If there are no products found
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send the products as a response
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProductsById(req, res) {
  try {
    const productId = req.query.Id;
    // console.log("ProductId: ", productId);
    // Validate the productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    // console.log(product);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getSearchProducts(req, res) {
  try {
    const { query } = req.query; // Extract the search query from the request

    // Search for products that match the search query
    const searchResults = await ProductModel.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Search by title (case-insensitive)
        { brand: { $regex: query, $options: "i" } }, // Search by brand (case-insensitive)
        { category: { $regex: query, $options: "i" } }, // Search by category (case-insensitive)
      ],
    });

    res.status(200).json(searchResults); // Send the search results as JSON response
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// const realGmailConnect = (req, res) => {
//   let config = {
//     service: 'gmail',
//     auth: {
//       user: '',
//       pass: ''
//     }
//   }
//   let transporter = nodemailer.createTransporter(config);
//   res.status(201).json("Real Gmail is Connected...!");
// }
