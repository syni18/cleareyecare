const setAuthHeader = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if()
    } catch (error) {
        console.error('Error adding access token to header', error.message);
    }
}

export default setAuthHeader;