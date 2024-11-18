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
app.use(cors());
app.use(morgan("tiny"));
app.use(
  session({
    secret: "your_secret_key",
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
      callbackURL: "http://localhost:5173/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
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
  
  res.status(201).json("");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("http://localhost:5173"); // Redirect to your frontend after successful login
  }
);

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
