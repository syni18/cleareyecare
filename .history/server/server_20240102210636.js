import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/connection.js";
import router from "./router/route.js";

const app = express();

// ** middleware **
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// app.use('x-powered-by');   // less hackers know about our stack

const port = ;

//  ** HTTP get Request **
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});
