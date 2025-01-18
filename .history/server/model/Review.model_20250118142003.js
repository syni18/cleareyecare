import mongoose from "mongoose";

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