import refreshAccessToken from "../utils/refreshAccessToken";


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
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, accessTokenExpiry, refreshTokenExpiry } = await refreshAccessToken(refreshToken);
        setTokenCookies( res,accessToken,refreshToken,accessTokenExpiry,refreshTokenExpiry);

        req.header["authorization"] = `Bearer ${accessToken}`;
      }
      next();
    } catch (error) {
      console.error("Error adding access token to header", error.message);
    }
}