import jwt from "jsonwebtoken";
import ENV from "../router/config.js"
import RefreshTokenModel from "../model/RefreshToken.model.js";

const verifyRefreshToken = async (refreshToken) => {
    try {
        const key = ENV.JWT_REFRESH_SECRET_KEY;
        log
        // const userRefreshToken = await RefreshTokenModel.findOne({token: refreshToken});

        // if(!userRefreshToken){
        //     throw new Error("Invalid refresh token");
        // }

        // // verify details
        // const tokenDetails = jwt.verify(userRefreshToken, key);

        // return {
        //     tokenDetails,
        //     error: false,
        //     msg: "Valid refresh token"
        // }
    } catch (error) {
        throw {error: true, msg: "Invalid refresh token"};
    }
}

export default verifyRefreshToken;