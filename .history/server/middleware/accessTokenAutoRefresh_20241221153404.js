import isTokenExpire from "../utils/isTokenExpireJWT.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokenCookies from "../utils/setTokenCookies.js";

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    console.log("Function accessTokenAuto");

    const accessToken = req.cookies.accessToken;
    console.log("AccessToken:", accessToken);

    if (accessToken && !isTokenExpire(accessToken)) {
      console.log("Valid access token found.");
      req.headers["authorization"] = `Bearer ${accessToken}`;
    } else {
      const refreshToken = req.cookies.refreshToken;
      console.log("RefreshToken:", refreshToken);

      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is missing" });
      }

      const {
        newAccessToken,
        newRefreshToken,
        newAccessTokenExpiry,
        newRefreshTokenExpiry,
      } = await refreshAccessToken(req, res);
      setTokenCookies(
        res,
        newAccessToken,
        newRefreshToken,
        newAccessTokenExpiry,
        newRefreshTokenExpiry
      );

      req.headers["authorization"] = `Bearer ${newAccessToken}`;
    }
  } catch (error) {
    console.error("Error adding access token to header:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  next();
};

export default accessTokenAutoRefresh;
