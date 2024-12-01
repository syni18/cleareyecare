import jwt from "jsonwebtoken";

const isTokenExpire = (token) => {
    if(!token) {
        return true;
    }

    const decodeToken = jwt.decode(token)
}
