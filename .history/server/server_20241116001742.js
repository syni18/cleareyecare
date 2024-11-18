import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/route.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import session from "express-session";
import ENV from "./router/config.js"

const app = express();

// ** middleware **
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("tiny"));
app.use(
  session({
    secret: "A6NPL7NNH28e7TN8epGksc3/dDl3FW6dslUuU1aGN0U=",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use('x-powered-by');   // less hackers know about our stack

// passport 
passport.use(
  new GoogleStrategy(
    {
      clientID: ENV.GCLOUD_CLIENT_ID,
      clientSecret: ENV.GCLOUD_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/v1/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("data", accessToken, refreshToken, profile);

      // Instead of using 'res', create a user object:
      const user = {
        profile: {
          name: profile.displayName,
          email: profile.emails[0].value,
          // ... other profile fields you want to send
        },
        accessToken: accessToken,
      };

      // Return the user object to Passport.js
      done(null, user);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// server port
const port = 8080;

//  ** HTTP get Request **
app.get("/", (req, res) => {
  res.status(201).json("backend server is up!!");
});

//api routes
app.use("/v1/api", router);

//  ** start server only when the valid db connection **
connect().then(() => {
  try {
    //  ** start server **
    app.listen(port, () => {
      console.log(`Server connected to http://localhost:${port}`);
    });
  } catch (error) {
    console.log(`Cannot connect to the server`);
  }
}).catch(error => {
    console.log(`Invalid database connnection...`);
})
