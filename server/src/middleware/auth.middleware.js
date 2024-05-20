const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiError"); // Corrected typo in ApiError import
const jwt = require("jsonwebtoken");
const { logError } = require("../helpers/errorLogger");

const verifyJWT = async (req, res, next) => {
    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer :", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request"); 
        }
    
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        // Find user by ID from the decoded token, excluding password and refreshToken fields
        const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token"); 
        }
    
        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        logError(error); 
        let statusCode = error.statusCode || 500; 
        res.status(statusCode).json(error); 
        return;
    }
}

module.exports = verifyJWT;
