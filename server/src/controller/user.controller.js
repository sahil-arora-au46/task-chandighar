const { generateAccessAndRefreshToken } = require("../helpers/user.helper.js");
const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiRError");
const ApiResponse = require("../utils/ApiResponse");
const {logError} =require("../helpers/errorLogger")





async function registerUser(req,res){


   const {userName,fullName,email,password} = req.body;
   if([userName,email,password,fullName].some((field)=> field?.trim() =="")){
       throw new ApiError(400,"All fields are required")}

   try {
 
       
 
       const isExistingUser = await userModel.findOne({
       $or: [
           { userName },
           { email }
       ]
   });
     
 
     if(isExistingUser){
         throw new ApiError(409,"User with email or username already exists")
     }
     
     const user = await userModel.create({
         userName,
         fullName,
         email,
         password,
 
     })

     const createdUser = await userModel.findById(user._id).select(
        "-password -refreshToken -records"
    )

     if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    res.status(201).json(
        
        new ApiResponse(200,"User create successfully !!",createdUser)
    )
    return ;

   } catch (error) {
    logError(error)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json(error)
    return;
   }



}



async function login(req,res){
try {
    const {userName,email,password} = req.body;
    
    console.log(userName,email,password,"checking ")
    
    
    if(!userName && !email){
        throw new ApiError(400,"userName or email required")
    }
    
    const user = await userModel.findOne({
        $or: [
            { userName },
            { email }
        ]
    })
    
    if(!user){
     throw new ApiError(404,"User not found")
    }
    
    
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    
    
    console.log(isPasswordCorrect,"checking password")
    
    
    if(!isPasswordCorrect){
        throw new ApiError(401,"Invalid user credentials")
    }
    
    const [accessToken,refreshToken] = await generateAccessAndRefreshToken(user._id)
    
    
    const loggedInUser = await userModel.findById(user._id)
    
    res.status(200).cookie("accessToken",accessToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure : true
    }).cookie("refreshToken",refreshToken,{
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, 
        secure : true
    }).json( {
        user: loggedInUser, accessToken, refreshToken
    })
    return;
} catch (error) {
    logError(error)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json(error)
    return;
}


}

async function logout(req,res){

    await userModel.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))


}

//TOdo : refreshToken,getCurrenrtUser ,changeCurrentPassword,updateAccountDetails,
//make after submmiting 
module.exports = {

    registerUser,
    login,
    logout



}