import mongoose, { MongooseError } from "mongoose";

export const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,        
    }
});

export default mongoose.model.Users || mongoose.model('User', UserSchema);