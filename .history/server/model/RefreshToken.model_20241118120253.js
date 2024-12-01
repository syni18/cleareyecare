import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Users',
        required: true
    },
    token: {
        type
    }
})