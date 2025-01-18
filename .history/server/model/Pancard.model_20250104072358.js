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
    },
    panNumber: {
        type: String,
        required: true,
        unique: true
    },
    panImage: {
        type: String,
        required: true
    },
    declaration: {
        type: Boolean,
    },
    verified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
})