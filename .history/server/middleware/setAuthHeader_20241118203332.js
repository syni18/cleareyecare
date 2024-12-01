import isTokenExpire from "../utils/isTokenExpireJWT";

const setAuthHeader = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(accessToken || !isTokenExpire(accessToken)){
            req.
        }
    } catch (error) {
        console.error('Error adding access token to header', error.message);
    }
}

export default setAuthHeader;