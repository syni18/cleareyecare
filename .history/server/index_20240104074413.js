import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const server = express();

server.use(express.json());
server.use(cors());

const port = 3000;

server.get('/', (req, res) => {
    jwt.
    res.status(200).send({ message: 'Welcome to the API'})
})


server.listen(port,()=> {
    console.log("Server is started at Port: ",port);
})