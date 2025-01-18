import jwt from "jsonwebtoken";
import ENV from '../router/config.js';
import RefreshTokenModel from "../model/RefreshToken.model.js";

const generateJWT = async (user) => {
    try {
        console.log("generate JWT called");
        
        const payload = {_id: user._id, ...user};
        
        const accessTokenExpiry = '100s' // expire in 100 seconds

        const accessToken = jwt.sign({
            ...payload,
            },
            ENV.JWT_SECRET_KEY, 
            {expiresIn: '100s'}
        );

        const refreshTokenExpiry = '5d' // expire in 5 days
        const refreshToken = jwt.sign({
            ...payload,
            },
            ENV.JWT_REFRESH_SECRET_KEY,
            {expiresIn: '5d'}
        );
        const isRefreshTokenExist = await RefreshTokenModel.findOne({userId: user._id});
        if(isRefreshTokenExist) {
            await RefreshTokenModel.deleteOne({userId: user._id});
        }
        //save new
        await new RefreshTokenModel({
            userId: user._id,
            token: refreshToken,
            expiry: refreshTokenExpiry,
        }).save();

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