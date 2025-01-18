import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model.