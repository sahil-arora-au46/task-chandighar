const recordModele = require("../models/record.model");
const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiRError");
const ApiResponse = require("../utils/ApiResponse");
const {logError }= require("../helpers/errorLogger")




async function getAllTask(req,res){

try {
        const userId = req.user._id;
    
        const records = await userModel.findById(userId).select("records").populate("records");
    
        if(!records){
            throw new ApiError(404,"Tasks not found")
        }
    
    
        res.status(200).json(new ApiResponse(200,"Success",records))
        return;
        
} catch (error) {
    logError(error)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json(error)
    return;
}


} 

async function addTask(req,res){

    try {
        
        const {taskNumber,estimates,notes}  = req.body;
        
        if(taskNumber=="" || notes=="" || !estimates.estimatedTime){
            throw new ApiError(400,"All fields are required")
        }
        const record = await recordModele.create({
            taskNumber,estimates,notes
        })
        if(!record){
            throw new ApiError(500,"Error in creating records");
        }


        const userId = req.user._id;
    
        await userModel.findByIdAndUpdate(userId,{$push:{records : record._id}});
    
      
    
    
        res.status(200).json(new ApiResponse(200,"Success",record))
        return;
        
} catch (error) {
    logError(error)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json(error.message)
    return;
}

}

async function updateTask(req,res){

 try {
       const taskId = req.query;
       const data = req.body;
       const updatedTask = recordModele.findByIdAndUpdate(taskId,data,{ new: true });
       if(!updatedTask){
           throw new ApiError(400,"Error updating Record")
       }
       res.status(200).json(new ApiResponse(200,"Success",updateTask))
       return
 } catch (error) {
    logError(error)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json(error.message)
    return;
 }

}


//TODO: make function after Submiting
async function deleteTask(req,res){

}

module.exports = {
    getAllTask,
    addTask,
    updateTask,
    deleteTask
}