import mongoose from "mongoose";

const PancardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true, // Cannot be changed
    },
    fullname: {
      type: String,
      required: true,
      trim: true, // Removes unnecessary whitespace
    },
    panNumber: {
      number: {
        type: String,
        required: true,
        unique: true,
        immutable: true, // Ensures it cannot be updated
      },
      iv: {
        type: String,
        required: true,
        immutable: true, // Ensures it cannot be updated
      },
      key: {
        type: String,
        required: true,
        immutable: true, // Ensures it cannot be updated
      },
    },
    panImage: {
      type: String,
      required: true,
      immutable: true, // Ensure it cannot be updated
    },
    declaration: {
      type: Boolean,
      required: true,
      default: false,
      immutable: true, // Cannot be changed
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Add an index to improve query performance by userId
PancardSchema.index({ userId: 1 });

// Export the model
export default mongoose.models.Pancard ||
  mongoose.model("Pancard", PancardSchema);
