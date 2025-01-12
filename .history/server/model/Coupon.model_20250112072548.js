// import moongoose
import mongoose from 'mongoose';
import Mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    // prepare coupons schema
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    // required: true
  }
  discount: {
    type: Number,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }

})