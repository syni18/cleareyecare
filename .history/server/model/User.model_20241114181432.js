import { Schema, model } from 'mongoose';

// Define the user schema
const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`,
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    dateOfBirth: Date,
    phoneNo: [String],
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'other',
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/150',
    },
    bio: {
        type: String,
        default: 'No bio provided',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    lastLoginAt: Date,
    isActive: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    platform: {
        type: String,
    },
    verification: {
        isVerified: {
            type: Boolean,
            default: false,
        },
        verificationToken: String,
        verifiedAt: Date,
    },
    address: [{
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
    }],
    socialProfiles: [{
        platform: String,
        username: String,
        url: String,
    }],
    preferences: {
        theme: {
            type: String,
            default: 'light',
        },
        language: {
            type: String,
            default: 'en',
        },
    },
    security: {
        twoFactorAuth: {
            type: Boolean,
            default: false,
        },
        securityQuestions: [{
            question: String,
            answer: String,
        }],
    },
    aadharCard: {
        cardNumber: String,
        name: String,
    },
    panCard: {
        cardNumber: String,
        name: String,
        dateOfBirth: { type: Date },
        issuedDate: { type: Date },
        expiryDate: { type: Date },
    },
    wishlist: [{
        item: String,
        price: Number,
        targetPrice: Number,
    }],
});

// Create and export the User model
export default model('User ', userSchema);