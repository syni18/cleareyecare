import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from '../router/config.js';

async function connect(){
    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    mongoose.set('strictQuery',true)
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(ENV.ATLAS_URIuseNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'clear_eye_care', // Specify the database name here
    });

    console.log("Database connected to clear_eye_care...");
    return db;
}
export default connect;