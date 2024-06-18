import jwt from "jsonwebtoken"
import ENV from '../router/config.js';


//  ** auth middleware **
export default async function Auth(req, res, next){
    try {
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        
        // retrieve the user details for the logged in User
        const decodeToken = await jwt.verify(token, ENV.JWT_SECRET);
        req.user = decodeToken;

        // res.json(decodeToken);
        next();
    }
    catch(error){
        res.status(401).json({error: "Authentication Failed"})
    }
}

// 
export function localVariables(req, res, next){
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}