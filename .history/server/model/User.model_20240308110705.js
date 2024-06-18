import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
    
  street: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
});

// Define subdocument schema for social profiles
const SocialProfileSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Facebook", "Twitter", "LinkedIn", "Instagram", "Other"],
  },
  url: String,
});

export const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  dateOfBirth: Date,
  phoneNo:[],
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  avatar: String,
  bio: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  lastLoginAt: Date,
  isActive: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  verification: {
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verifiedAt: Date,
  },
  contact: {
    phone: String,
    address: AddressSchema,
  },
  socialProfiles: [SocialProfileSchema],
  preferences: {
    theme: String,
    language: String,
  },
  security: {
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    securityQuestions: [
      {
        question: String,
        answer: String,
      },
    ],
  },
});

export default mongoose.model.users || mongoose.model('User', UserSchema);