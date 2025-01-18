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
import PancardModel from "../model/Pancard.model.js";
import { decryptionText, encryptionText } from "../encryption/AESencryption.js";
import wishlistsModel from "../model/wishlists.model.js";
import ShoppingBagModel from "../model/ShoppingBag.model.js"
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

    console.log("Creating", accessToken, refreshToken);
    
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
  // console.log(" re", req.user);
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
  const { values, mode } = req.body;
  const { userId } = req.user;

  try {
    console.log("Incoming values:", values, "Mode:", mode);

    // Check if the user exists
    const isUserExist = await UserModel.findById(userId);
    if (!isUserExist) {
      return res.status(401).json({ error: "Unauthorized access attempt" });
    }

    if (mode === "create") {
      // Check if userId already exists in AddressModel
      let userAddressData = await AddressModel.findOne({ userId });

      // Generate a new UUID if values.id is an empty string
      if (!values.id) {
        values.id = uuidv4();
      }

      if (userAddressData) {
        // If the user already has addresses, add the new address
        userAddressData.addresses.push(values);

        // If no default address exists, set the new one as default
        if (!userAddressData.defaultAddress) {
          userAddressData.defaultAddress = values;
        }

        await userAddressData.save();
        return res.status(201).json({
          status: true,
          address: values,
          msg: "Address added successfully",
        });
      } else {
        // If no entry exists for this user, create a new one
        const newAddressEntry = new AddressModel({
          userId,
          defaultAddress: values,
          addresses: [values],
        });

        await newAddressEntry.save();
        return res.status(201).json({
          status: true,
          address: values,
          msg: "Address added successfully",
        });
      }
    }

    if (mode === "update") {
      // Find the existing address by userId and address ID
      const userAddressData = await AddressModel.findOne({ userId });
      console.log("userAddressData", userAddressData);
      
      if (!userAddressData) {
        return res.status(404).json({ error: "Address not found" });
      }

      const addressIndex = userAddressData.addresses.findIndex(
        (addr) => addr.id === values.id
      );
      

      if (addressIndex === -1) {
        return res.status(404).json({ error: "Address not found" });
      }

      // Update the specific address
      userAddressData.addresses[addressIndex] = {
        ...userAddressData.addresses[addressIndex],
        ...values,
      };

      // If defaultAddress is being updated, update it
      if (userAddressData.defaultAddress.id === values.id) {
        userAddressData.defaultAddress =
          userAddressData.addresses[addressIndex];
      }

      await userAddressData.save();

      return res.status(200).json({
        status: true,
        address: userAddressData.addresses[addressIndex],
        msg: "Address updated successfully",
      });
    }

    return res.status(400).json({ error: "Invalid mode" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get saved addresses for a user
export async function getUserAddresses(req, res) {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ error: "User  not found" });
    }

    // Find addresses associated with the user
    const isAddressExist = await AddressModel.findOne({ userId: user._id });
    // console.log("Addresses found:", isAddressExist);
    
    // Return the addresses array
    res.status(200).json({ addressList: isAddressExist.addresses });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Delete an address for a user
export async function deleteAddressById(req, res) {
  try {
    const user = req.user; // Authenticated user
    const { id } = req.params; // Address ID to delete

    if (!user) {
      return res.status(401).json({ error: "Unauthorized Access" });
    }

    // Find the user's address document in a single call
    const userAddresses = await AddressModel.findOne({ userId: user._id });

    if (!userAddresses) {
      return res.status(404).json({ error: "Address document not found" });
    }

    // Check if the address to delete exists in the addresses array
    const addressIndex = userAddresses.addresses.findIndex(
      (address) => address.id === id
    );

    if (addressIndex === -1) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Check if the address to delete is the default address
    const isDefaultAddress = userAddresses.defaultAddress?.id === id;

    // Remove the address from the addresses array
    userAddresses.addresses.splice(addressIndex, 1);

    // Update default address if the deleted address was the default
    if (isDefaultAddress) {
      if (userAddresses.addresses.length > 0) {
        userAddresses.defaultAddress = userAddresses.addresses[0];
      } else {
        userAddresses.defaultAddress = null;
      }
    }

    // Save the updated document
    await userAddresses.save();

    res.status(200).json({
      success: true,
      msg: "Address deleted successfully",
      defaultAddress: userAddresses.defaultAddress,
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// add pan card details
export async function pancardvalidation(req, res) {
  try {
    const user = req.user; // Assuming `req.user` contains authenticated user info
    const { values } = req.body;    

    // Encrypt PAN number and PAN image
    const encryptedPanNumber = encryptionText(values.panNumber);
    const encryptedPanImage = encryptionText(values.panImage);

    // Check for existing PAN card or PAN number
    const existingPanRecord = await PancardModel.findOne({
      $or: [{ userId: user.id }, { "panNumber.number": encryptedPanNumber.encrypt }],
    });

    if (existingPanRecord) {
      if (existingPanRecord.userId.toString() === user.id) {
        return res
          .status(400)
          .json({status: false, msg: "User has already saved a PAN card." });
      }

      if (existingPanRecord.panNumber.number === encryptedPanNumber) {
        return res
          .status(400)
          .json({ status: false, msg: "This PAN number is already registered." });
      }
    }

    // Create a new PAN card entry
    const newPancard = new PancardModel({
      userId: user.id,
      fullname: values.fullname,
      panNumber: {
        number: encryptedPanNumber.encrypt,
        secret: {
          iv: encryptedPanNumber.secret.iv,
          key: encryptedPanNumber.secret.key,
        },
      },
      panImage: {
        image: encryptedPanImage.encrypt,
        secret: {
          iv: encryptedPanImage.secret.iv,
          key: encryptedPanImage.secret.key,
        },
      },
      declaration: values.declaration,
    });

    // Save to database
    await newPancard.save();

    return res.status(201).json({
      msg: "PAN card saved successfully.",
      pancard: newPancard,
    });
  } catch (error) {
    console.error("Error adding PAN card information:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



// get the information about the Pan Card
export async function getPancardDetails(req, res) {
  try {
    const user = req.user; // Assuming `req.user` contains authenticated user info
    const isPanExist = await PancardModel.findOne({ userId: user.id });

    if (!isPanExist) {
      return res.status(404).json({ status: false, msg: "PAN card details not found." });
    }
    
    // Decrypt sensitive data
    const data = {
      userId: isPanExist.userId,
      fullname: isPanExist.fullname,
      panImage: decryptionText(isPanExist.panImage.image, isPanExist.panImage.secret.key),
      panNumber: decryptionText(isPanExist.panNumber.number, isPanExist.panNumber.secret.key),
      declaration: isPanExist.declaration,
    };

    return res.status(200).json({ success: true, msg: "pan details found!", data: data });
  } catch (error) {
    console.error("Error fetching PAN card details:", error);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}


export async function addItemWishlists(req, res) {
  try {
    const user = req.user;
    const { id } = req.params;

    // Check if the wishlist exists for the user
    const isWishlistExists = await wishlistsModel.findOne({ userId: user.id });

    if (isWishlistExists) {
      // Check if the productId already exists in the items array
      const isProductExists = isWishlistExists.items.some(
        (item) => item.productId.toString() === id
      );

      if (isProductExists) {
        return res
          .status(400)
          .json({status: false, msg: "Product already exists in the wishlist" });
      } else {
        // Add the productId to the items array with optional notes
        isWishlistExists.items.push({
          productId: id,
        });
        await isWishlistExists.save(); // Save the updated wishlist
        return res
          .status(200)
          .json({status: true ,msg: "Product added to wishlist successfully" });
      }
    } else {
      // If the wishlist doesn't exist, create a new one with the productId
      const newWishlist = new wishlistsModel({
        userId: user.id,
        items: [
          {
            productId: id,
          },
        ],
      });
      await newWishlist.save(); // Save the new wishlist
      return res
        .status(201)
        .json({status: true, msg: "Wishlist created and product added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({status: false, msg: "Internal Server Error" });
  }
}
export async function removeItemWishlists(req, res) {
  try {
    const userId = req.user.id;
    const { id: productId } = req.params;

    // Check if the wishlist exists for the user and find the product index in one query
    const wishlist = await wishlistsModel.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        status: false,
        msg: "Wishlist not found for the user",
      });
    }

    // Find the index of the product in the items array
    const productIndex = wishlist.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        status: false,
        msg: "Product not found in the wishlist",
      });
    }

    // Remove the product from the items array and save the updated wishlist
    wishlist.items.splice(productIndex, 1);
    await wishlist.save();

    // Populate the entire product object and return updated items
    const updatedWishlist = await wishlistsModel
      .findOne({ userId })
      .populate("items.productId")
      .exec();

    const items = updatedWishlist.items.map((item) => item.productId);

    return res.status(200).json({
      status: true,
      msg: "Product removed from wishlist successfully",
      updatedWishlist: items,
    });
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


export async function getWishlists(req, res) {
  try {
    const user = req.user;
    const { location } = req.query;
    
    if(location === "homepage") {
      const isWishlistExist = await wishlistsModel.findOne({ userId: user.id});
      if(!isWishlistExist) {
        return res.status(404).json({ error: "User's wishlist not found" });
      }
      const items = isWishlistExist.items.map((item) => item.productId);
      return res.status(200).json({wishlist: items});
    } else {
      const isWishlistExist = await wishlistsModel
        .findOne({ userId: user.id })
        .populate("items.productId") // Populate the entire product object
        .exec();
      if (!isWishlistExist) {
        return res.status(404).json({ error: "User's wishlist not found" });
      }
      const items = isWishlistExist.items.map((item) => item.productId);

      return res.status(200).json({ wishlist: items });
    }
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


import ShoppingBagModel from "../models/ShoppingBag.js"; // Adjust the path to your ShoppingBag model

export async function addItemsToCart(req, res) {
  try {
    const user = req.user; // Assuming the user is authenticated and attached to the request
    const { product } = req.body; // Expecting a product object in the request body

    if (!product || !product._id || !product.price || !product.quantity) {
      return res
        .status(400)
        .json({
          status: false,
          msg:
            "Incomplete product data. Ensure product ID, price, and quantity are provided.",
        });
    }

    // Check if the user's cart already exists
    let isCartExist = await ShoppingBagModel.findOne({ userId: user._id });

    if (!isCartExist) {
      // If no cart exists, create a new one
      isC = new ShoppingBagModel({
        userId: user._id,
        items: [],
        totalPrice: 0,
      });
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (existingItem) {
      // If the product exists, update the quantity
      existingItem.quantity += product.quantity;
    } else {
      // If the product does not exist, add it to the cart
      cart.items.push({
        productId: product._id,
        name: product.name || "Unnamed Product", // Use product name if available
        price: product.price,
        quantity: product.quantity,
        discount: product.discount || {}, // Add discount if provided
      });
    }

    // Recalculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      const discountValue = item.discount?.value || 0;
      return total + item.price * item.quantity - discountValue;
    }, 0);

    // Save the updated cart to the database
    await isCartExist.save();

    res
      .status(200)
      .json({ status: true, cart: isCartExist, msg: "Product added to the cart successfully." });
  } catch (error) {
    console.error("Error adding items to cart:", error);
    res.status(500).json({ status: false, msg: "Internal server error." });
  }
}



export async function removeItemsFromCart(req, res) {
  try {
    const user = req.user; // Assuming user is already authenticated and attached to the request
    const { product } = req.body; // Expecting a product object in the request body

    if (!product || !product._id) {
      return res
        .status(400)
        .json({
          status: false,
          msg: "Product object or ID is missing in the request body.",
        });
    }

    // Check if the user's cart exists
    const isCartExist = await ShoppingBagModel.findOne({ userId: user._id });

    if (!isCartExist) {
      return res.status(404).json({ status: false, msg: "User's cart not found." });
    }

    // Find the index of the product to remove
    const itemIndex = isCartExist.items.findIndex(
      (item) => item.productId.toString() === product._id.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ status: false, msg: "Product not found in the cart." });
    }

    // Remove the product from the items array
    isCartExist.items.splice(itemIndex, 1);

    // Recalculate the total price after removing the item
    isCartExist.totalPrice = isCartExist.items.reduce((total, item) => {
      const discountValue = item.discount?.value || 0;
      return total + item.price * item.quantity - discountValue;
    }, 0);

    // Save the updated cart to the database
    await isCartExist.save();

    res
      .status(200)
      .json({ status: true, cart: isCartExist, msg: "Product removed from the cart successfully." });
  } catch (error) {
    console.error("Error removing items from cart:", error);
    res.status(500).json({ status: false, msg: "Internal server error." });
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
