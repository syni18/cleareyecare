import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique: false,        
    }
  "User": {
    "id": "string (primary key)",
    "username": "string (unique)",
    "email": "string (unique)",
    "password": "string (hashed)",
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "date",
    "gender": "string (enum: male, female, other)",
    "avatar": "string (URL to user's avatar image)",
    "bio": "string (user's biography)",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "lastLoginAt": "datetime",
    "isActive": "boolean",
    "isAdmin": "boolean",
    "verification": {
      "isVerified": "boolean",
      "verificationToken": "string",
      "verifiedAt": "datetime"
    },
    "contact": {
      "phone": "string",
      "address": {
        "street": "string",
        "city": "string",
        "state": "string",
        "country": "string",
        "postalCode": "string"
      }
    },
    "socialProfiles": [
      {
        "type": "string (enum: facebook, twitter, linkedin, etc.)",
        "url": "string"
      }
    ],
    "preferences": {
      "theme": "string",
      "language": "string"
    },
    "security": {
      "twoFactorAuth": "boolean",
      "securityQuestions": [
        {
          "question": "string",
          "answer": "string"
        }
      ]
    }
  }
}

});

export default mongoose.model.users || mongoose.model('User', UserSchema);