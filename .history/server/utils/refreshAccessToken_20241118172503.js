import RefreshTokenModel from "../model/RefreshToken.model";
import UserModel from "../model/User.model";

const refreshAccessToken = async (req, res ) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;
        const { tokenDetails, error, msg } = await verifyRefreshToken(oldRefreshToken);
        if (error) {
            return res.status(401).send({status: "failed", msg: msg})
        }

        const getUser = await UserModel.findById(tokenDetails._id);
        if(!getUser) {
            
        }
        const userRefreshToken = await RefreshTokenModel.findOne({userId: tokenDetails._id});
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: "Invalid refresh token" });
    }
}