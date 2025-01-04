import mongoose from "mongoose";

const PancardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullname: {
        type: String,
        required: true
    }
})