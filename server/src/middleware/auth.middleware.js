const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiRError");
const jwt = require("jsonwebtoken");
const {logError} =require("../helpers/errorLogger");

const verifyJWT = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer :", "")
        

        // console.log(token,"checking token",);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        logError(error)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json(error)
        return;
    }
    
}

module.exports = verifyJWT