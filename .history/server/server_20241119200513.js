import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/route.js";
import './components/google-strategy.js'
import cookieParser from "cookie-parser";
import session from "express-session";

app.use(
  session({
    secret: ENV.SESSION_KEY, // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use secure: true if using HTTPS
  })
);

const app = express();

// ** middleware **
app.use(express.json());
// Use cookie-parser middleware
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("tiny"));
// app.use('x-powered-by');   // less hackers know about our stack

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
