const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUND = require("../constants");
const jwt = require("jsonwebtoken");


const userSchema = new Schema({

userName:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
},
fullName: {
    type: String,
    required: true,
    trim: true, 
},

email: {
    type: String,
    required: true,
    unique: true,
    lowecase: true,
    trim: true, 
    index:true
},
password : {
    type:String,
    required:true
},
refreshToken: {
    type: String,
},
records:[{
    type:mongoose.Schema.Types.ObjectId,
    ref : "records"
}]

},{
    versionKey: false
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})



userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        // eslint-disable-next-line no-undef
        process.env.ACCESS_TOKEN_SECRET,
        {
            // eslint-disable-next-line no-undef
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        // eslint-disable-next-line no-undef
        process.env.REFRESH_TOKEN_SECRET,
        {
            // eslint-disable-next-line no-undef
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const userModel=mongoose.model("User",userSchema);

module.exports = userModel;