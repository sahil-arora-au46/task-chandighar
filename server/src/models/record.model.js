const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const recordSchema = new Schema({
    taskNumber:{
        type : String,
        required:true,
        unique :true,
        match:/^[A-Z][0-9]+$/

    },
    estimates:[{
        estimatedTime:{
            type:String,
            required:true,
            
        },
        estimateNotes:{
            type:String,
            default:""
        }
    }],

    actualHours:{
        type:Number
        
    },
    notes:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    finalNote:{
        type:String,
    }
},{timestamps:true})


const  recordModel = mongoose.model("records",recordSchema);

module.exports =  recordModel
