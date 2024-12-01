import jwt from "jsonwebtoken";
import ENV from "../router/config.js"
import RefreshToken from "../model/RefreshToken.model.js";

const verifyRefreshToken = async (refreshToken) => {
    try {
        const key = ENV.JWT_REFRESH_SECRET_KEY;
        const userRefreshToken = await RefreshToken.findOne({token: refreshToken});

        if(!userRefreshToken){
            throw new Error("Invalid refresh token");
        }

        // verify details
    } catch (error) {
        
    }
}

export default verifyRefreshToken;