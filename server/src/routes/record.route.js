const { Router } = require("express");
const verifyJWT = require("../middleware/auth.middleware.js");
const { getAllTask, addTask, updateTask, deleteTask } = require("../controller/record.controller.js");

const recordRouter = new Router();

// Route to get all tasks, protected by JWT verification middleware
recordRouter.get("/allrecords", verifyJWT, getAllTask);

// Route to add a new task.
recordRouter.post("/addTask", verifyJWT, addTask);

// Route to update a task by task ID.
recordRouter.put("/update/:taskId", verifyJWT, updateTask);

// Route to delete a task by task ID.
recordRouter.delete("/delete/:taskId", verifyJWT, deleteTask);

module.exports = recordRouter;
