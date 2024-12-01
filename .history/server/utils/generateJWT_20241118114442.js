import jwt from "jsonwebtoken";

const generateJWT = async (user) => {
    try {
        const payload = {_id: user._id, role: user.role};
        const accessTokenExpiry = Math.floor(Date.now() / 1000) + 100; // expire in 10 sec
    }
}