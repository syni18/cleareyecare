const ensurpeOtpVerified = (req, res, next) => {
  if (req.session.otpVerified) {
    next(); // User is verified, proceed to the next middleware or route handler
  } else {
    res.status(403).send("Access Denied. Please verify your OTP first.");
  }
};
