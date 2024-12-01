import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'User',
        // required: true
    },
    token: {
        type: String,
        required: true,
    },
    blackList: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5d'
    }
})

export default mongoose.model.refreshTokens || mongoose.model("RefreshTokens", RefreshTokenSchema);