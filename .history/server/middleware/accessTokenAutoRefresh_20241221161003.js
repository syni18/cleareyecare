import isTokenExpire from "../utils/isTokenExpireJWT.js";
import refreshAccessToken from "../utils/refreshAccessToken.js";
import setTokenCookies from "../utils/setTokenCookies.js";

const accessTokenAutoRefresh = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    console.log("accessToken: " + accessToken);
    
    if (accessToken && !isTokenExpire(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
      console.log("req", req.headers);
      
      return next(); // Proceed if access token is valid
    } else {
      const refreshToken = req.cookies.refreshToken;

      console.log("refresh", refreshToken);
      
      if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is missing" });
      }

      // Refresh the access token
      const { newAccessToken, newRefreshToken } = await refreshAccessToken(
        req,
        res
      );
      console.log("token", newAccessToken, refreshAccessToken);
      

      // Set new tokens in cookies
      setTokenCookies(res, newAccessToken, newRefreshToken);

      req.headers["authorization"] = `Bearer ${newAccessToken}`;
      return next(); // Proceed after setting new tokens
    }
  } catch (error) {
    console.error("Error adding access token to header:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export default accessTokenAutoRefresh;
