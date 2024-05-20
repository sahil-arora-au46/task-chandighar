const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Define the schema for a record
const recordSchema = new Schema({
    taskNumber: {
        type: String,
        required: true, 
        unique: true, 
        match: /^[A-Z][0-9]+$/ // Task number must match the pattern: starts with an uppercase letter followed by one or more digits
    },
    estimates: [{
        estimatedTime: {
            type: String,
            required: true, 
        },
        estimateNotes: {
            type: String,
            default: "" 
        }
    }],
    actualHours: {
        type: Number, 
    },
    notes: {
        type: String,
        required: true 
    },
    isCompleted: {
        type: Boolean,
        default: false 
    },
    finalNote: {
        type: String, 
    }
}, { timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false // Disable the __v field
}); // Automatically manage createdAt and updatedAt fields

// Create the model from the schema
const recordModel = mongoose.model("records", recordSchema);

module.exports = recordModel;
