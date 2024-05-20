const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");

// Function to generate access and refresh tokens for a user
const generateAccessAndRefreshToken = async (userId) => {
    try {
        // Find the user by userId
        const user = await userModel.findById(userId);
        
        // Generate access and refresh token
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Update the user's refreshToken in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Return both access and refresh tokens
        return [accessToken, refreshToken];
    } catch (error) {
        
        throw new ApiError(500, "Failed to generate tokens", [error]);
    }
}

module.exports = {
    generateAccessAndRefreshToken
};
