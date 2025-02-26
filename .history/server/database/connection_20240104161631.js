import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../router/config.js';

async function connect(){
    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    mongoose.set('strictQuery',true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database connected...",db.)
    return db;
}
export default connect;