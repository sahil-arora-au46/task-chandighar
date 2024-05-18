const {Router} = require("express");
const {registerUser,login,logout} = require("../controller/user.controller.js");
const verifyJWT = require("../middleware/auth.middleware.js")

const userRouter = new Router()



userRouter.post("/register",registerUser);
userRouter.post("/login",login);
userRouter.post("/logout",verifyJWT,logout)


module.exports = {

    userRouter

}