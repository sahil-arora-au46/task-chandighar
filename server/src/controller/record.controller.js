const recordModel = require("../models/record.model");
const userModel = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { logError } = require("../helpers/errorLogger");

// Controller function to get all tasks
async function getAllTask(req, res) {
    try {
        const userId = req.user._id;
        // Find the user by ID and populate the 'records' field
        const records = await userModel.findById(userId).select("records").populate("records");
        if (!records) {
            throw new ApiError(404, "Tasks not found");
        }
        res.status(200).json(new ApiResponse(200, "Success", records));
        return;
    } catch (error) {
        logError(error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json(error);
        return;
    }
}

// Controller function to add a new task
async function addTask(req, res) {
    try {
        // Extract task details from request body
        const { taskNumber, estimates, notes } = req.body;
        // Check if required fields are empty
        if (taskNumber == "" || notes == "" || !estimates.estimatedTime) {
            throw new ApiError(400, "All fields are required");
        }
        // Create a new task record
        const record = await recordModel.create({
            taskNumber,
            estimates,
            notes
        });
        if (!record) {
            throw new ApiError(500, "Error in creating records");
        }
        // Get the user's ID from the request
        const userId = req.user._id;
        // Update the user's records array with the new task ID
        await userModel.findByIdAndUpdate(userId, { $push: { records: record._id } });
        res.status(200).json(new ApiResponse(200, "Success", record));
        return;
    } catch (error) {
        logError(error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json(error.message);
        return;
    }
}

// Controller function to update a task
async function updateTask(req, res) {
    try {
        const taskId = req.query; 
        const data = req.body; 
        // Update the task by ID with the new data
        const updatedTask = await recordModel.findByIdAndUpdate(taskId, data, { new: true });
        if (!updatedTask) {
            throw new ApiError(400, "Error updating Record");
        }
        res.status(200).json(new ApiResponse(200, "Success", updatedTask));
        return;
    } catch (error) {
        logError(error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json(error.message);
        return;
    }
}

//TODO: Implement function after Submitting
async function deleteTask(req, res) {
    // Function to delete a task
}

module.exports = {
    getAllTask,
    addTask,
    updateTask,
    deleteTask
};
