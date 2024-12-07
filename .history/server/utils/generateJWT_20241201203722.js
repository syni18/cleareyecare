import jwt from "jsonwebtoken";
import ENV from '../router/config.js';
import RefreshTokenModel from "../model/RefreshToken.model.js";

const generateJWT = async (user) => {
    try {
        
        const payload = {_id: user._id};
        const accessTokenExpiry = Math.floor(Date.now() / 1000) + 100; // expire in 100 seconds

        const accessToken = jwt.sign({
            ...payload, 
            exp: accessTokenExpiry,
            },
            ENV.JWT_SECRET_KEY, 
            // {expiresIn: '100'}
        );

        const refreshTokenExpiry = Math.floor(Date.now() / 1000) + 60*60*24*5; // expire in 5 days
        const refreshToken = jwt.sign({
            ...payload,
            exp: refreshTokenExpiry,
            },
            ENV.JWT_REFRESH_SECRET_KEY,
            // {expiresIn: '5d'}
        );
        const isRefreshTokenExist = await RefreshTokenModel.findOne({userId: user._id});
        if(isRefreshTokenExist) {
            await RefreshTokenModel.deleteOne({userId: user._id});
        }
        //save new
        await new RefreshTokenModel({
            userId: user._id,
            token: refreshToken,
            // expiry: refreshTokenExpiry,
        }).save();

        // console.log("token saved successfully", accessToken, refreshToken, accessTokenExpiry, refreshTokenExpiry);
        
        return {
          accessToken,
          refreshToken,
          accessTokenExpiry: accessTokenExpiry,
          refreshTokenExpiry: refreshTokenExpiry // 5 days
        };
    } catch (err) {
        return Promise.reject(err);
    }
}

export default generateJWT;