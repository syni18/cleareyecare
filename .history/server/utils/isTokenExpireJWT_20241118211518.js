import jwt from "jsonwebtoken";

const isTokenExpire = (token) => {
    if(!token) {
        return true;
    }

    const decodeToken = jwt.decode(token);
    console.log("deco", de);
    
    const currentTime = Date.now() / 1000;
    return decodeToken.exp < currentTime;
}


export default isTokenExpire;