// import moongoose
import mongoose from 'mongoose';

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
  },
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

export default mongoose.model.coupons