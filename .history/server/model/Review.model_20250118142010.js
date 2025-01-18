import mongoose from "mongoose";

const reviewCardSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [String],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviewCard: [reviewCardSchema],
});

export default mongoose.model.reviews ||
  mongoose.model("Reviews", reviewSchema);