import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import ENV =
async function connect(){
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri();

    mongoose.set('strictQuery',true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect();
    console.log("Database connected...");
    return db;
}
export default connect;