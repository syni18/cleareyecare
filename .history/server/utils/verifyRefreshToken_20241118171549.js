import jwt from "jsonwebtoken";
import ENV from "../router/config.js"
import RefreshToken from "../model/RefreshToken.model.js";

const verifyRefreshToken = async (refreshToken) => {
    try {
        const key = ENV.JWT_REFRESH_SECRET_KEY;
        const userRefreshToken = await Re
    } catch (error) {
        
    }
}

export default verifyRefreshToken;