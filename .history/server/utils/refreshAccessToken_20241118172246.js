import UserModel from "../model/User.model";

const refreshAccessToken = async (req, res ) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        const { tokenDetails, error, msg } = await verifyRefreshToken(oldRefreshToken);
        if (error) {
            return res.status(401).send({status: "failed", msg: msg})
        }

        const getUser = await UserModel.findById
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid refresh token" });
    }
}