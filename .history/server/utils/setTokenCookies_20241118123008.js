const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExpiry,
  refreshToken
) => {
    const accessTokenMaxAge = (accessTokenExpiry - Math.floor(Date))
};

export default setTokenCookies;