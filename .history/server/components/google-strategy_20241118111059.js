import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import UserModel from '../model/User.model';
import ENV from '../router/config';

passport.use(
  new GoogleStrategy(
    {  
        clientID: ENV.GCLOUD_CLIENT_ID,
        clientSecret: ENV.GCLOUD_CLIENT_SECRET,
        callbackURL: `${ENV.BASE_URL}v1/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log("profile", profile);
        try {
            const isUserExist = await UserModel.findOne({ email: profile._json.email });

            // generate Token JWT
            const { accessToken, refreshToken, accessTokenExpiry,  } =
        } catch(err) {
            console.error('Error fetching user profile:', err);
            return cb(err);
        };
    }));