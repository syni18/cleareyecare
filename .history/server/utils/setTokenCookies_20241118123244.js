const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExpiry,
  refreshToken
) => {
  const accessTokenMaxAge =
    (accessTokenExpiry - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenMaxAge =
    (refreshTokenExpiry - Math.floor(Date.now() / 1000)) * 1000;

  //set cookie
  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenMaxAge,
    httpOnly: true,
    secure: true,
    //   sameSite: 'strict',
  });

  res.cookie("refreshToken", refreshTokenTok, {
    maxAge: accessTokenMaxAge,
    httpOnly: true,
    secure: true,
    //   sameSite: 'strict',
  });
};

export default setTokenCookies;