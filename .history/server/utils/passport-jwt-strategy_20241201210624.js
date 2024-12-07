import UserModel from "../model/User.model.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";
import ENV from "../router/config.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, async function (jwtPayload, done) {
    try {
        const user = await UserModel.findO
    } catch (error) {
        return done(error, false);
    }
  }));