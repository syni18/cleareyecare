import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    
});

export default mongoose.model.reviews ||
  mongoose.model("Reviews", reviewSchema);