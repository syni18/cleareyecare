import isTokenExpire from "../utils/isTokenExpireJWT.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokenCookies from "../utils/setTokenCookies.js";


const accessTokenAutoRefresh= async (req, res, next) => {
    try {
      console.log("");
      
      const accessToken = req.cookies.accessToken;

      if (accessToken || !isTokenExpire(accessToken)) {
        console.log("acc", accessToken);
        
        req.headers['authorization'] = `Bearer ${accessToken}`;
      }
      if(!accessToken || isTokenExpire(accessToken)) {
        const refreshToken = req.cookies.refreshToken;
        // console.log("re", refreshToken);
        
        if(!refreshToken) {
            throw new Error('Refres token is missing');
        }
        const { newAccessToken, newRefreshToken, newAccessTokenExpiry, newRefreshTokenExpiry } = await refreshAccessToken(req, res);
        setTokenCookies(
          res,
          newAccessToken,
          newRefreshToken,
          newAccessTokenExpiry,
          newRefreshTokenExpiry
        );

        req.headers['authorization'] = `Bearer ${newRefreshToken}`;
      }
    } catch (error) {
      console.error("Error adding access token to header", error.message);
    }
    next();

}

export default accessTokenAutoRefresh;