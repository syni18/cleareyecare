import { Router } from "express";

const router = Router();

// ** import all controller **
import * as controller from '../controllers/appController.js';
import Auth,{ localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

// Post method
router.route('/register').post(controller.register)  // register user
router.route('/registerMail').post(registerMail);  // send the email
router.route("/authenticate").post(controller.verifyUser,(req,res)=> res.end());  // authenticate the user
router.route("/login").post(controller.verifyUser,controller.login);  // login in app


// Get method
router.route('/user/:username').get(controller.getUser);  // user with username
router.route("/generate-Otp").get(localVariables, controller.generateOTP);  // generate random unique OTP
router.route("/verify-Otp").get( controller.verifyOTP);  // verify the generated OTP
router.route("/createResetSession").get(controller.createResetSession);  // reset all the veriables

// Put method
router.route('/updateuser').put(Auth, controller.updateUser);  // is use to update the user profile
router.route("/resetPassword").put(controller.verifyUser, controller.resetPassword);  // use to reset password



export default router;