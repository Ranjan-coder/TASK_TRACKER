const mongoose = require('mongoose');
const Task = require('./task.model');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Username must be at least 4 characters long'], // Optional validation
        maxlength: [10, 'Username cannot exceed 50 characters'] // Optional validation
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please provide a valid email address'] // Optional validation for email format
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'] // Optional validation
    },
    tasks: [{
        type: mongoose.Types.ObjectId,
        ref: 'Task' // Reference to the Task model
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
