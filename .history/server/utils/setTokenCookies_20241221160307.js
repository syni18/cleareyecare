const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExpiry,
  refreshTokenExpiry
) => {
  const accessTokenMaxAge =
    (accessTokenExpiry - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenMaxAge =
    (refreshTokenExpiry - Math.floor(Date.now() / 1000)) * 1000;

    console.log("gg", accessTokenMaxAge, refreshTokenMaxAge);
    
  //set cookie
  res.cookie("accessToken", accessToken, {
    maxAge: '100',
    httpOnly: true,
    secure: true,
    //   sameSite: 'strict',
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: '5d',
    httpOnly: true,
    secure: true,
    //   sameSite: 'strict',
  });
};

export default setTokenCookies;