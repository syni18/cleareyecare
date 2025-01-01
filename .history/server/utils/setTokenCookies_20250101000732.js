import ms from 'ms'; // Import the 'ms' library for parsing time strings

const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExpiry,
  refreshTokenExpiry
) => {
  console.log("setTokenCookies called");
  
  // Convert the accessTokenExpiry string to milliseconds
  const accessTokenMaxAge = ms(accessTokenExpiry); // ms will handle strings like '100s', '2d', '1h', etc.

  // Convert the refreshTokenExpiry string to milliseconds
  const refreshTokenMaxAge = ms(refreshTokenExpiry);

  //set cookie
  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenMaxAge,
    httpOnly: true,
    secure: true,
    //   sameSite: 'strict',
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: refreshTokenMaxAge,
    httpOnly: true,
    secure: true,
    //   sameSite: 'strict',
  });
};

export default setTokenCookies;