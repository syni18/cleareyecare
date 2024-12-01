import jwt from "jsonwebtoken";

const generateJWT = async (user) => {
    try {
        const payload = {_id: user._id, role: user.role};
        const accessTokenExpiry = Math.floor(Date.now() / 1000) + 100; // expire in 100 seconds
        const accessToken = jwt.sign({
            ...payload, 
            expiry: accessTokenExpiry,
        }
            ENV.JWT_SECRET_KEY, 
            // {expiresIn: accessTokenExpiry}
        );
    }
}