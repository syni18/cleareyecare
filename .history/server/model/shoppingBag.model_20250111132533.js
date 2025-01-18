import mongoose from "mongoose";

// Define the schema for cart items
const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // Ensure quantity is at least 1
  },
  total: {
    type: Number,
    required: true,
  },
});
const ShoppingBagSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [CartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    couponApplied: {
        type: String,
        default: null,
    },
    deliveryAddress: {
        type
    }
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    timestamp: {
        type: Date,
        default: Date.now
    }

})


