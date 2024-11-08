import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import ENV from '../router/config.js'
import otpGenerator from "otp-generator";
import { v4 as uuidv4 } from "uuid";
import ProductModel from "../model/Product.model.js";

//  ** middleware for verify user **
export async function verifyUser(req, res, next) {
    try{
        const {email} = req.body;

        // check the user existance 
        let exist = await UserModel.findOne({email});
        if(!exist) return res.status(404).send({error: "Can't find User"});
        // return res.status(200).send(exist);
        console.log("app-Controller: ", exist);
        next();
    }catch(error){
        return res.status(404).send({error: "Authentication Error"});
    }
}


// POST: http://localhost:8080/api/register
export async function register(req, res) {
    try {
        const { fullname, email, password } = req.body;

        // Check for existing email
        const existEmail = UserModel.findOne({ email });

        existEmail.then((existingUser) => {
            if (existingUser) {
                return res.status(400).json({ error: "Email address already exists." });
            } else {
                // Hash password
                bcrypt.hash(password, 10).then((hashedPassword) => {
                    const user = new UserModel({
                        fullname,
                        email,
                        password: hashedPassword,
                        createdAt: new Date(), // Set current date as createdAt
                        lastLoginAt: null, // Set lastLoginAt to null initially
                        isActive: true, // Set isActive to true by default
                        isAdmin: false, // Set isAdmin to false by default
                    });

                    // Save user to the database
                    user.save().then((result) => {
                        res.status(201).json({ message: "User registered successfully" });
                    }).catch((error) => {
                        res.status(500).json({ error: "Failed to register user", details: error });
                    });
                }).catch((hashError) => {
                    res.status(500).json({ error: "Error hashing password", details: hashError });
                });
            }
        }).catch((error) => {
            res.status(500).json({ error: "Database error", details: error });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error", details: error });
    }
}

// **  **

// POST: http://localhost:8080/api/login
export async function login(req, res) {
    const { email, password } = req.body;

    try {
        // Find the user by email
        UserModel.findOne({ email })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ error: "Email address not found" });
                }

                // Compare passwords
                bcrypt.compare(password, user.password)
                    .then((passwordMatch) => {
                        if (!passwordMatch) {
                            return res.status(400).json({ error: "Password does not match" });
                        }

                        // Update lastLoginAt field to current date and time
                        user.lastLoginAt = new Date();
                        user.save(); // Save the updated user

                        // Create JWT token
                        const token = jwt.sign(
                            {
                                userId: user._id,
                                username: user.fullname,
                                useremail: user.email
                            },
                            ENV.JWT_SECRET,
                            { expiresIn: "24h" }
                        );

                        // Return successful login response with token
                        return res.status(200).json({
                            message: "Login successful",
                            username: user.fullname,
                            email: user.email,
                            token
                        });
                    })
                    .catch((compareError) => {
                        console.log(compareError);
                        return res.status(500).json({ error: "Internal server error" });
                    });
            })
            .catch((error) => {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// GET: http://localhost:8080/api/user/example123
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(400).send({ error: "Invalid Name" });

    const user = await UserModel.findOne({ username}).exec();

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

// GET: http://localhost:8080/api/user/email
export async function getUserByEmail(req, res) {
  const { email } = req.params;
  console.log(email);

  try {
    if (!email) return res.status(400).send({ error: "Invalid email" });

    const user = await UserModel.findOne({ email}).exec();

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
export async function updateUser(req, res) {
  try {
    const data = req.body;
    console.log(data.userId);

    if (data.userId) {
      const { firstName, lastName, email, phoneNo } = data.credential;
      // console.log(firstName, lastName, email, phoneNo);
      // Construct an object to hold the fields to be updated
      const updateFields = {};
      if (firstName || lastName) updateFields.fullname = `${firstName} ${lastName}`;
      if (email) updateFields.email = email;
      if (phoneNo) updateFields.phoneNo = phoneNo;

      const updatedUser = await UserModel.findByIdAndUpdate(
        { _id: data.userId },
        updateFields,
        {
          new: true,
        }
      );

      if (updatedUser) {
        return res.status(200).send({ msg: "Record Updated!", updatedUser });
      } else {
        return res.status(404).send({ error: "User Not Found!" });
      }
    } else {
      return res.status(400).send({ error: "Missing User ID" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};



// ** GET: http://localhost:8080/api/generate-Otp **
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6,{lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars:false});

    res.status(201).send({code: req.app.locals.OTP})
}

// ** GET: http://localhost:8080/api/verify-Otp **
export async function verifyOTP(req, res) {
    const { code } = req.query;

    if(parseInt(req.app.locals.OTP) === parseInt(code)){
        req.app.locals.OTP = null;     // reset the oTP value
        req.app.locals.resetSession = true;  // start the session for the reset password

        return res.status(201).send({mesg: "Verify Successfully!"})
    }
    return res. status(400).send({error : "InValid OTP"})
}

// ** GET: http://localhost:8080/api/createResetSession **
export async function createResetSession(req, res) {
     if (req.app.locals.resetSession) {
       return res.status(201).send({ flag: req.app.locals.resetSession });
     }
     return res.status(440).send({ error: "Session expired!" });
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
  try {
    if (!req.app.locals.resetSession)
      return res.status(440).send({ error: "Session expired!" });

    const { useremail, password } = req.body;
    console.log("reset: ",useremail);

   try {
     const user = await UserModel.findOne({ email:useremail });
     console.log("user", user);

     if (!user) {
       return res.status(404).send({ error: "Username not Found" });
     }

     const hashedPassword = await bcrypt.hash(password, 10);

     const updatedUser = await UserModel.findOneAndUpdate(
       { email: user.email },
       { password: hashedPassword },
       { new: true }
     );

     if (!updatedUser) {
       return res.status(500).send({ error: "Unable to update password" });
     }

     req.app.locals.resetSession = false; // reset session
     return res.status(201).send({ msg: "Record Updated...!" });
   } catch (error) {
     console.error(error);
     return res.status(500).send({ error: "Unable to reset password" });
   }

  } catch (error) {
    return res.status(401).send({ error });
  }
}

// Add new address for delivery
// ** POST : http://localhost:8080/api/newAddress   */
export async function addNewAddress(req, res) {
  try {
    const data = req.body;
    console.log(data);

    if (data.userId) {
      const body = data.formData;
      const mode  = data.mode;
      console.log(mode);

      if (mode === 'edit' && body.addressId) {
        // Update existing address
        const updatedAddress = await UserModel.findOneAndUpdate(
          { _id: data.userId, 'address.addressId': body.addressId },
          {
            $set: {
              'address.$.fullName': body.fullName,
              'address.$.phoneNumber': body.phoneNumber,
              'address.$.pincode': body.pincode,
              'address.$.locality': body.locality,
              'address.$.address': body.address,
              'address.$.cityDistrictTown': body.cityDistrictTown,
              'address.$.state': body.state,
              'address.$.landmark': body.landmark,
              'address.$.altMobile': body.altMobile,
              'address.$.addressType': body.addressType,
            }
          },
          { new: true }
        );

        if (updatedAddress) {
          return res.status(200).send({ msg: "Address Updated!", updatedAddress });
        } else {
          return res.status(404).send({ error: "Address Not Found!" });
        }
      } else {
        // Add new address
        const newAddress = {
          addressId: uuidv4(), // Generate unique ID for the address
          ...body,
        };

        const user = await UserModel.findByIdAndUpdate(
          { _id: data.userId },
          { $push: { address: newAddress } },
          { new: true }
        );

        if (user) {
          return res.status(200).send({ msg: "Address Added!", user });
        } else {
          return res.status(404).send({ error: "User Not Found!" });
        }
      }
    } else {
      return res.status(400).send({ error: "Missing User ID" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};


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
};

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
    user.address = user.address.filter((address) => address.addressId !== addressId);

    // Save the updated user object
    await user.save();

    // Return success message
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


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
      return res.status(400).json({ message: "PAN card details already exist for this user." });
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
};

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
      { $addToSet: { watchlist: {productId} } },
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


export async function getWatchlist(req, res){
  try {
    const { userId } = req.query; // Assuming userId is provided as a query parameter
    console.log("userId: ",userId);

    // Fetch user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("userWatchlist", user.watchlist.length);
    // Return the addresses array
    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// this is related to product Database schema
export async function products(req, res){
  try{
      const productsData = req.body; // Assuming products are sent in the body of the request
      console.log(productsData.body.length);
      const savedProducts = await ProductModel.insertMany(productsData.body);
      res.status(201).json(savedProducts);
    } catch (error) {
        console.error('Error saving products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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



// cashfree payment gateway integration
import { Cashfree } from "cashfree-pg"; 
import {}
Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.DEVELOPMENT;

export async function cashfreeCreateOrder(req, res) {
   var request = {
     order_amount: "1",
     order_currency: "INR",
     customer_details: {
       customer_id: "node_sdk_test",
       customer_name: "",
       customer_email: "example@gmail.com",
       customer_phone: "9999999999",
     },
     order_meta: {
       return_url:
         "https://test.cashfree.com/pgappsdemos/return.php?order_id=order_123",
     },
     order_note: "",
   };

   Cashfree.PGCreateOrder("2023-08-01", request)
     .then((response) => {
       var a = response.data;
       console.log(a);
     })
     .catch((error) => {
       console.error("Error setting up order request:", error.response.data);
     });
  
}

// cashfreeCreateOrder();