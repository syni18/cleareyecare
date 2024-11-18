import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/route.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import session = require("express-session");

const app = express();

// ** middleware **
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// app.use('x-powered-by');   // less hackers know about our stack

const port = 8080;

//  ** HTTP get Request **
app.get("/", (req, res) => {
  
  res.status(201).json("Home GET Request");
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
