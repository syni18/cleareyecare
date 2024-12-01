const refreshAccessToken = async (req, res ) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        const { tokenDetails, error } = await verifyRefreshToken(oldRefreshToken);
        if (error) {
            returrn res.status(401).send({status: "failed", msg: msg})
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
}