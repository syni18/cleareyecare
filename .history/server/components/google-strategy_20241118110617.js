import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import UserModel from '../model/User.model';
import ENV from '../router/config';

passport.use(
  new GoogleStrategy(
    {  
        clientID: ENV.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}v1/api/auth/google/callback`,
    },