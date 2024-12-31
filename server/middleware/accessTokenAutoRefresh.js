import isTokenExpire from "../utils/isTokenExpireJWT.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokenCookies from "../utils/setTokenCookies.js";


const accessTokenAutoRefresh= async (req, res, next) => {
    try {
        console.log("access token Auto refresh called");
      const accessToken = req.cookies.accessToken;

      if (accessToken || !isTokenExpire(accessToken)) {
        req.headers['authorization'] = `Bearer ${accessToken}`;
      }
      if(!accessToken || isTokenExpire(accessToken)) {
        const refreshToken = req.cookies.refreshToken;
        
        if(!refreshToken) {
            throw new Error('Refresh token is missing');
        }
        const { newAccessToken, newRefreshToken, newAccessTokenExpiry, newRefreshTokenExpiry } = await refreshAccessToken(req, res);
        setTokenCookies(
          res,
          newAccessToken,
          newRefreshToken,
          newAccessTokenExpiry,
          newRefreshTokenExpiry
        );

        req.headers['authorization'] = `Bearer ${newAccessToken}`;
      }
    } catch (error) {
      console.error("Error adding access token to header", error.message);
    }
    next();

}

export default accessTokenAutoRefresh;