import mongoose, { Document, Model } from "mongoose";

// Define interface for Address subdocument
interface Address {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}

// Define interface for SocialProfile subdocument
interface SocialProfile {
    type: string; // Can be Facebook, Twitter, etc.
    url: string;
}

// Define interface for User document
interface UserDocument extends Document {
    fullname: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    gender: string;
    avatar: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt: Date;
    isActive: boolean;
    isAdmin: boolean;
    verification: {
        isVerified: boolean;
        verificationToken: string;
        verifiedAt: Date;
    };
    contact: {
        phone: string;
        address: Address;
    };
    socialProfiles: SocialProfile[];
    preferences: {
        theme: string;
        language: string;
    };
    security: {
        twoFactorAuth: boolean;
        securityQuestions: {
            question: string;
            answer: string;
        }[];
    };
}

// Define interface for User model
interface UserModel extends Model<UserDocument> {}

const UserSchema = new mongoose.Schema<UserDocument>({
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
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    avatar: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    lastLoginAt: Date,
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verification: {
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: String,
        verifiedAt: Date
    },
    contact: {
        phone: String,
        address: {
            street: String,
            city: String,
            state: String,
            country: String,
            postalCode: String
        }
    },
    socialProfiles: [{
        type: {
            type: String,
            enum: ["Facebook", "Twitter", "LinkedIn", "Instagram", "Other"]
        },
        url: String
    }],
    preferences: {
        theme: String,
        language: String
    },
    security: {
        twoFactorAuth: {
            type: Boolean,
            default: false
        },
        securityQuestions: [{
            question: String,
            answer: String
        }]
    }
});

// Export the User model
export const User: UserModel = mongoose.models.User || mongoose.model<UserDocument, UserModel>('User', UserSchema);
