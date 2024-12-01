import jwt from "jsonwebtoken";
import ENV from'./
const generateJWT = async (user) => {
    try {
        const payload = {_id: user._id, role: user.role};
        const accessTokenExpiry = Math.floor(Date.now() / 1000) + 100; // expire in 100 seconds
        const accessToken = jwt.sign({
            ...payload, 
            expiry: accessTokenExpiry,
            },
            ENV.JWT_SECRET_KEY, 
            // {expiresIn: accessTokenExpiry}
        );

        const refreshTokenExpiry = Math.floor(Date.now() / 1000) + 60*60*24*5; // expire in 5 days
        const refreshToken = jwt.sign({
            ...payload,
            expiry: refreshTokenExpiry,
            },
            ENV.JWT_REFRESH_SECRET_KEY
        )
    }
}