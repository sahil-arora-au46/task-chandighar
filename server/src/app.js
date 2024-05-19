
var express = require('express');

var cookieParser = require('cookie-parser');

var {userRouter} = require('./routes/user.route');

const recordRouter = require("./routes/record.route")


var app = express();
var cors = require('cors')

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true // This allows cookies to be included in cross-origin requests
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use("/records", recordRouter)



module.exports = app;
