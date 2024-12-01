import mongoose from "mongoose";

const RecoveryOTPSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    create: {
        type: Date,
        required: true
    }
})
