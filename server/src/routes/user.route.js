const { Router } = require("express");
const { registerUser, login, logout } = require("../controller/user.controller.js");
const verifyJWT = require("../middleware/auth.middleware.js");

const userRouter = new Router();

// Route to register a new user
userRouter.post("/register", registerUser);

// Route to login a user
userRouter.post("/login", login);

// Route to logout a user, protected by JWT verification middleware
userRouter.post("/logout", verifyJWT, logout);

module.exports = {
    userRouter
};
