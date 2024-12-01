import refreshAccessToken from "../utils/refreshAccessToken";
import setTokenCookies from "../utils/setTokenCookies";


const accessTokenAutoRefresh= async (req, res, next) => {
    try {
      const accessToken = req.cookies.accessToken;
      console.log("t", accessToken);

      if (accessToken || !isTokenExpire(accessToken)) {
        req.header["authorization"] = `Bearer ${accessToken}`;
      }
      if(!accessToken || !isTokenExpire(accessToken)) {
        const refreshToken = req.cookies.refreshToken;
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

        req.header["authorization"] = `Bearer ${accessToken}`;
      }
      next();
    } catch (error) {
      console.error("Error adding access token to header", error.message);
    }
}

export 