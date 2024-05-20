const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUND = require("../constants");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    records: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "records" // Reference to the records model
    }]
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false // Disable the __v field
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next(); // Only hash the password if it has been modified
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt round of 10
    next(); // Move to the next middleware
});

// Method to check if the provided password is correct
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password); // Compare provided password with the hashed password
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.userName, =
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key for signing access token
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Token expiry time
        }
    );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key for signing refresh token
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Token expiry time
        }
    );
};

// Create the model from the schema
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
