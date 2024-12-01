const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExpiry,
  refreshToken
) => {
    const accessTokenMaxAge = (accessTokenExpiry - Math.floor(Date.now() / 1000)) * 1000;
    const refreshTokenMaxAge = (refreshTokenExpiry - Math.floor(Date.now() / 1000)) * 1000;

    //set 
};

export default setTokenCookies;