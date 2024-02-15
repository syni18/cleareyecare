import express from "express";
import cors from "cors";

const server = express();

server.use(express.json());
server.use(cors());

const port = 3000;

server.get('/', (req, res) => {
    
})