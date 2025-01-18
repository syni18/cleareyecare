import UserModel from "../model/User.model";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from "passport";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}