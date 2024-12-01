import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import ENV from '../router/config.js';
import UserModel from '../model/User.model.js';
import generateJWT from '../utils/generateJWT.js';

passport.use(
  new GoogleStrategy(
    {  
        clientID: ENV.GCLOUD_CLIENT_ID,
        clientSecret: ENV.GCLOUD_CLIENT_SECRET,
        callbackURL: `${ENV.BASE_URL}v1/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const isUserExist = await UserModel.findOne({ email: profile._json.email });
            if(!isUserExist) {
                 const password = generatePassword(
                   profile._json.given_name,
                   profile._json.family_name
                 );
                await UserModel.create({
                  fullname: profile._json.name,
                  firstname: profile._json.given_name,
                  lastname: profile._json.family_name,
                  avatar: profile._json.picture,
                  googleId: profile._json.sub,
                  email: profile._json.email,
                  password: "google-password", // Placeholder password
                  email: profile._json.email,
                  decryptPassword: "google-password", // Placeholder password
                  isActive: true, // Set isActive to true by default
                  isAdmin: false, // Set isAdmin to false by default
                });
            }
            // generate Token JWT
            const { accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry } = await generateJWT(isUserExist);
            return done(null, {isUserExist, accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry})
        } catch(err) {
            console.error('Error fetching user profile:', err);
            return done(err);
        };
    }));