import jwt from "jsonwebtoken";

const isTokenExpire = (token) => {
    if(!token) {
        return true;
    }

    const decodeToken = jwt.decode(token);
    const currentTime = Date.now() / 1000;
    return decodeToken
}
