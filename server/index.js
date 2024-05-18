const app = require("./src/app");
const connect = require("./connectDB");

require("dotenv").config();

connect().then(()=>{
    app.listen(4909,()=>{
        console.log("server started")
    })
}).catch((err)=>{
    console.log(err)
})