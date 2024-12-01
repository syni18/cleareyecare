const refreshAccessToken = async (req, res ) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        const { } = await verifyRefreshToken(old);
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
}