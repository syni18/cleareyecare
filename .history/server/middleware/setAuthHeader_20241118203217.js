const setAuthHeader = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        
    } catch (error) {
        console.error('Error adding access token to header', error.message);
    }
}

export default setAuthHeader;