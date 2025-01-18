import { Router } from "express";
import passport from "passport";

const router = Router();

// ** import all controller **
import * as controller from '../controllers/appController.js';
import Auth,{ localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";
// import setAuthHeader from "../middleware/setAuthHeader.js";
import accessTokenAutoRefresh from "../middleware/accessTokenAutoRefresh.js";
// import passwordResetSession from "../middleware/passwordResetSession.js";

// Post method
router.route('/register').post(controller.register);  // register user
router.route('/registerMail').post(registerMail);  // send the email
router.route('/refreshtoken').post(controller.getNewAccessToken); //)
router.route("/authenticate").post(controller.verifyUser,(req,res)=> res.end());  // authenticate the user
router.route("/login").post(controller.login);  // login in app
router.route("/logout").post(accessTokenAutoRefresh, controller.logout);  // login in app
router.route('/recovery').post(controller.recovery); // recovery in app
router.route("/manageAddress").post(accessTokenAutoRefresh,passport.authenticate('jwt', { session: false }),controller.manageAddress);  //add address in db
router.route("/addPANCard").post(controller.addPANCard);  //add pan card in db
router.route("/addTowatchlist").post(controller.addToWatchlist);  //add product to watchlist
router.route("/products").post(controller.products);  //insert products
router.route("/validate-session").get(controller.passwordValidateSession);
router.route("/logout-session").post(controller.passwordLogoutSession);



// Get method
router.route("/auth/google").get(controller.getAuthGoogle);
router.route("/auth/google/callback").get(controller.getCallbackGoogle);
router.route('/users').get(accessTokenAutoRefresh, passport.authenticate('jwt', {session: false}),controller.getUser);  // user with username
router.route('/user/email/:email').get(controller.getUserByEmail);  // user with userEmail
router.route("/generate-Otp").get(localVariables, controller.generateOTP);  // generate random unique OTP
router.route("/verify-Otp").post( controller.verifyOTP);  // verify the generated OTP
router.route("/check-session").get(controller.passwordResetSession);  
router.route("/addresses").get(controller.get);  //saved address
router.route("/getWatchlist").get(accessTokenAutoRefresh ,controller.getWatchlist);  //saved watchlist
router.route("/getProducts").get(controller.getProducts)  // get all products
router.route("/getProductsById").get(controller.getProductsById);  //get product by id
router.route("/getProducts/search").get(controller.getSearchProducts); //get th e search result


// Put method
router
  .route("/updateUserProfile")
  .put(
    accessTokenAutoRefresh,
    passport.authenticate("jwt", { session: false }),
    controller.updateUserProfile
  );  // is use to update the user profile
router.route("/resetPassword").put( controller.resetPassword);  // use to reset password

// Delete Method
router.route("/deleteSavedAddress").delete(controller.deleteAddress);  //delete the saved address list item
router.route("/users/:userId/watchlist/:productId").delete(controller.removeFromWatchlist);  //remove product to watchlist

export default router;