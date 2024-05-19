
var express = require('express');

var cookieParser = require('cookie-parser');

var {userRouter} = require('./routes/user.route');

const recordRouter = require("./routes/record.route")


var app = express();
var cors = require('cors')

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5175',
    credentials: true // This allows cookies to be included in cross-origin requests
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5175');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use("/records", recordRouter)



module.exports = app;
