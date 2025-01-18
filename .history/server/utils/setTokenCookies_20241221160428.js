const setTokenCookies = (
  res,
  accessToken,
  refreshToken,
  accessTokenExpiry,
  refreshTokenExpiry
) => {
  // Calculate max age for cookies in milliseconds
  const accessTokenMaxAge = 100 * 1000; // 100 seconds
  const refreshTokenMaxAge = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds

  console.log(
    "Access Token Max Age:",
    accessTokenMaxAge,
    "Refresh Token Max Age:",
    refreshTokenMaxAge
  );

  // Set cookies
  res.cookie("accessToken", accessToken, {
    maxAge: accessTokenMaxAge, // Set to valid number
    httpOnly: true,
    secure: true, // Ensure this is set to true in production
    // sameSite: 'strict', // Uncomment if needed for security
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: refreshTokenMaxAge, // Set to valid number
    httpOnly: true,
    secure: true, // Ensure this is set to true in production
    // sameSite: 'strict', // Uncomment if needed for security
  });
};

export default setTokenCookies;
