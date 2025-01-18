import mongoose from "mongoose";

const PancardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true, // Make it immutable
    },
    fullname: {
      type: String,
      required: true,
      trim: true, // Remove unnecessary whitespace
    },
    panNumber: {
      type: String,
      required: true,
      unique: true,
      immutable: true, // Make it immutable
    },
    panImage: {
      type: String,
      required: true,
      immutable: true, // Make it immutable
      secret: {
        iv: {
            type: String,
            requ
        }
      }
    },
    declaration: {
      type: Boolean,
      required: true,
      default: false,
      immutable: true, // Make it immutable
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  }
);

// Add an index to improve search queries by userId
PancardSchema.index({ userId: 1 });

// Optional pre-save hook to update `updatedAt`
PancardSchema.pre("save", function (next) {
  if (!this.isNew) {
    this.updatedAt = Date.now();
  }
  next();
});

export default mongoose.model.pancard ||
  mongoose.model("Pancard", PancardSchema);

