var express = require('express');
var cookieParser = require('cookie-parser');
var { userRouter } = require('./routes/user.route');
const recordRouter = require("./routes/record.route");

var app = express();
var cors = require('cors');

// Initialize cookie parser middleware
app.use(cookieParser());

// Set up CORS middleware to allow requests from specified origin with credentials
app.use(cors({
    origin: 'http://localhost:5175',
    credentials: true
}));

// Enable JSON parsing for incoming requests
app.use(express.json());

// Enable URL-encoded data parsing for incoming requests
app.use(express.urlencoded({ extended: true }));

// Mount userRouter on '/user' path
app.use('/user', userRouter);

// Mount recordRouter on '/records' path
app.use("/records", recordRouter);

// Export the app module
module.exports = app;
