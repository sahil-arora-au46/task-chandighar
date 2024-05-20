const { generateAccessAndRefreshToken } = require("../helpers/user.helper.js");
const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiRError");
const ApiResponse = require("../utils/ApiResponse");
const { logError } = require("../helpers/errorLogger");

// Controller function to register a new user
async function registerUser(req, res) {
    const { userName, fullName, email, password } = req.body;
    
    // Check if any required fields are empty
    if ([userName, email, password, fullName].some((field) => field?.trim() == "")) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        // Check if the user already exists with the same username or email
        const isExistingUser = await userModel.findOne({
            $or: [
                { userName },
                { email }
            ]
        });

        if (isExistingUser) {
            throw new ApiError(409, "User with email or username already exists");
        }

        // Create the user
        const user = await userModel.create({
            userName,
            fullName,
            email,
            password
        });

        // Retrieve the newly created user excluding sensitive fields
        const createdUser = await userModel.findById(user._id).select("-password -refreshToken -records");

        
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        
        res.status(201).json(new ApiResponse(200, "User created successfully !!", createdUser));
        return;

    } catch (error) {
       
        logError(error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json(error);
        return;
    }
}

// Controller function to login a user
async function login(req, res) {
    try {
        const { userName, email, password } = req.body;

        // Check if username or email is provided
        if (!userName && !email) {
            throw new ApiError(400, "Username or email required");
        }

        // Find the user by username or email
        const user = await userModel.findOne({
            $or: [
                { userName },
                { email }
            ]
        });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Check if password is correct
        const isPasswordCorrect = await user.isPasswordCorrect(password);

        // If password is incorrect, throw error
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid user credentials");
        }

        // Generate access and refresh tokens
        const [accessToken, refreshToken] = await generateAccessAndRefreshToken(user._id);

        // Retrieve the logged-in user excluding sensitive fields
        const loggedInUser = await userModel.findById(user._id).select("-password -refreshToken -records");

        // Set cookies for access and refresh tokens, and respond with user and tokens
        res.status(200).cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        }).json({
            user: loggedInUser,
            accessToken,
            refreshToken
        });
        return;
    } catch (error) {
        // Log and handle errors
        logError(error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json(error);
        return;
    }
}

// Controller function to logout a user
async function logout(req, res) {
    try {
        // Remove refreshToken from the user
        await userModel.findByIdAndUpdate(
            req.user._id,
            { $unset: { refreshToken: 1 } },
            { new: true }
        );

        // Clear cookies for access and refresh tokens
        const options = { maxAge: 0 };
        return res.clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .status(200)
            .json(new ApiResponse(200, {}, "User logged out"));
    } catch (error) {
        logError(error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json(error);
        return;
    }
}

module.exports = {
    registerUser,
    login,
    logout
};
