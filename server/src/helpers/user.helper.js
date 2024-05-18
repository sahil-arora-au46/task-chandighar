const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiRError");




const generateAccessAndRefreshToken = async (userId)=>{


  try {
     const user =  await userModel.findById(userId);
  
     const accessToken =  user.generateAccessToken();
     const refreshToken = user.generateRefreshToken();

     user.refreshToken = refreshToken;
     await user.save();

     return [accessToken,refreshToken]
  } catch (error) {
    throw new ApiError(500,"Failed to generate tokens",[error])
  }

}


module.exports = {
    generateAccessAndRefreshToken
}