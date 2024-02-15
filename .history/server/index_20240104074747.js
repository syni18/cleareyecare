import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const server = express();

server.use(express.json());
server.use(cors());

const port = 3000;

const SECRETKEY = 'k7V4CLs2qv8CRhB4IMgSiIqmtgT1XtB+uNh1zRUuNFQ=';

server.get('/', (req, res) => {
    jwt.sign({
        username: "Sahil",
        email: 'sahilsrivastava19@gmail.com'
    },SECRETKEY)
    res.status(200).send({ message: 'Welcome to the API'})
})


server.listen(port,()=> {
    console.log("Server is started at Port: ",port);
})