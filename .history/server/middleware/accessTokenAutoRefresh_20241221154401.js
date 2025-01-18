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
      return next(); // Call next if access token is valid
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

      // Set new tokens in cookies
      setTokenCookies(
        res,
        newAccessToken,
        newRefreshToken,
        newAccessTokenExpiry,
        newRefreshTokenExpiry
      );

      req.headers["authorization"] = `Bearer ${newAccessToken}`;
      return next(); // Call next after setting new tokens
    }
  } catch (error) {
    console.error("Error adding access token to header:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default accessTokenAutoRefresh;
