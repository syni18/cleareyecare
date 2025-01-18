import UserModel from "../model/User.model.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";
import ENV from "../router/config.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ENV.JWT_SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await UserModel.findOne({
            _id: jwt_payload._id,
        }).se;
        if(user) {            
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
  }));