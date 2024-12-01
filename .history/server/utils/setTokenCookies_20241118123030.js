const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExpiry,
  refreshToken
) => {
    const accessTokenMaxAge = (accessTokenExpiry - Math.floor(Date.now() / 1000)) * 1000;
    const refreshTokenMaxAge = refreshTokenExpiry * 1000;
};

export default setTokenCookies;