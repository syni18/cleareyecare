import jwt from "jsonwebtoken";

const isTokenExpire = (token) => {
    if(!token) {
        return true;
    }

    const decodeToken = jwt.decode(token);
    log
    const currentTime = Date.now() / 1000;
    return decodeToken.exp < currentTime;
}


export default isTokenExpire;