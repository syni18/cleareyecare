import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import passport from 'passport';
import ENV from '../router/config.js';
import UserModel from '../model/User.model.js';
import generateJWT from '../utils/generateJWT.js';

// Configure Google Strategy
passport.use(new GoogleStrategy({
    clientID: ENV.GCLOUD_CLIENT_ID,
    clientSecret: ENV.GCLOUD_CLIENT_SECRET,
    callbackURL: `${ENV.BASE_URL}v1/api/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        let user = await UserModel.findOne({ email: profile._json.email });

        // If user doesn't exist, create a new user
        if (!user) {
            const password = generatePassword(profile._json.given_name, profile._json.family_name);
            user = await UserModel.create({
                fullname: profile._json.name,
                firstname: profile._json.given_name,
                lastname: profile._json.family_name,
                avatar: profile._json.picture,
                googleId: profile._json.sub,
                email: profile._json.email,
                password: await bcrypt.hash(password, 10), // Hash the generated password
                isActive: true,
                isAdmin: false,
            });
        }

        // Generate JWT token for the user
        const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = await generateJWT(user);
        return done(null, { user, accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        return done(err);
    }
}));

// Function to generate a password
function generatePassword(firstname, lastname) {
    const specialCharacter = "@";
    const numericValues = Math.floor(100 + Math.random() * 900).toString(); // Generates a random 3-digit number

    const firstPart = (firstname.substring(0, 3) + generateRandomString(3)).substring(0, 3);
    const lastPart = (lastname ? lastname.substring(0, 3) : '' + generateRandomString(3)).substring(0, 3);

    return `${firstPart}${lastPart}${specialCharacter}${numericValues}`;
}

// Helper function to generate a random string of specified length
function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}