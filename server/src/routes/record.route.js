const {Router} = require("express");
const verifyJWT = require("../middleware/auth.middleware.js");

const { getAllTask,addTask,updateTask,deleteTask} = require("../controller/record.controller.js")

const recordRouter = new Router();

recordRouter.get("/allrecords",verifyJWT,getAllTask);
recordRouter.post("/addTask",verifyJWT,addTask);
recordRouter.put("/update/:taskId",verifyJWT,updateTask)
recordRouter.delete("/delete/:taskId",verifyJWT,deleteTask)




module.exports = recordRouter ;



