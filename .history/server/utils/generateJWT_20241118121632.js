import jwt from "jsonwebtoken";
import ENV from '../router/config';
import RefreshTokenModel from "../model/RefreshToken.model";

const generateJWT = async (user) => {
    try {
        const payload = {_id: user._id, role: user.role};
        const accessTokenExpiry = Math.floor(Date.now() / 1000) + 100; // expire in 100 seconds

        const accessToken = jwt.sign({
            ...payload, 
            expiry: accessTokenExpiry,
            },
            ENV.JWT_SECRET_KEY, 
            // {expiresIn: '100'}
        );

        const refreshTokenExpiry = Math.floor(Date.now() / 1000) + 60*60*24*5; // expire in 5 days
        const refreshToken = jwt.sign({
            ...payload,
            expiry: refreshTokenExpiry,
            },
            ENV.JWT_REFRESH_SECRET_KEY
            // {expiresIn: '5d}
        );
        const isRefreshTokenExist = await RefreshTokenModel.findOne({userId: user._id})
        return Promise.resolve({ accessToken, refreshToken, refreshTokenExpiry, accessTokenExpiry });
    } catch (err) {

    }
}