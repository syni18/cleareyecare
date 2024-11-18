import { Router } from "express";
import passport from "passport";

const router = Router();

// ** import all controller **
import * as controller from '../controllers/appController.js';
import Auth,{ localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

// Post method
router.route('/register').post(controller.register);  // register user
router.route('/registerMail').post(registerMail);  // send the email
router.route("/authenticate").post(controller.verifyUser,(req,res)=> res.end());  // authenticate the user
router.route("/login").post(controller.verifyUser,controller.login);  // login in app
router.route("/newAddress").post(controller.addNewAddress);  //add address in db
router.route("/addPANCard").post(controller.addPANCard);  //add pan card in db
router.route("/addTowatchlist").post(controller.addToWatchlist);  //add product to watchlist
router.route("/products").post(controller.products);  //insert products


// Get method
router
  .route("/auth/google")
  .get(c);

router
  .route("/auth/google/callback")
  .get(
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      // Successful login
      res.redirect("http://localhost:5173"); // Redirect to React app or desired page
    }
  );
router.route('/user/:username').get(controller.getUser);  // user with username
router.route('/user/email/:email').get(controller.getUserByEmail);  // user with userEmail
router.route("/generate-Otp").get(localVariables, controller.generateOTP);  // generate random unique OTP
router.route("/verify-Otp").get( controller.verifyOTP);  // verify the generated OTP
router.route("/createResetSession").get(controller.createResetSession);  // reset all the veriables
router.route("/savedaddress").get(controller.getSavedAddress);  //saved address
router.route("/getWatchlist").get(controller.getWatchlist);  //saved watchlist
router.route("/getProducts").get(controller.getProducts)  // get all products
router.route("/getProductsById").get(controller.getProductsById);  //get product by id
router.route("/getProducts/search").get(controller.getSearchProducts); //get th e search result


// Put method
router.route('/updateUser').put(controller.updateUser);  // is use to update the user profile
router.route("/resetPassword").put( controller.resetPassword);  // use to reset password

// Delete Method
router.route("/deleteSavedAddress").delete(controller.deleteAddress);  //delete the saved address list item
router.route("/users/:userId/watchlist/:productId").delete(controller.removeFromWatchlist);  //remove product to watchlist

export default router;