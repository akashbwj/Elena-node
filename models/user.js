
const mongoose = require('mongoose');
const joi = require('joi');

const User = mongoose.model('User', new mongoose.Schema({
    email: { 
        type: String, 
        unique: true,
        required: true,
        maxlength: 75
    },
    username: { 
        type: String, 
        unique: true,
        required: true,
        maxlength: 25
     },
    password: { 
        type: String, 
        required: true,
        minlength: 8,
        maxlength: 1024
     },
    isAdmin: { type: Boolean, default: false },
    firstName: { 
        type: String, 
        required: true,
        maxlength: 50
     },
    lastName: { type: String, maxlength: 50 }
}, {timestamp: true}));


function validateData(user) {
    const userSchema = joi.object({
        emailId: joi.string().max(75).required(),
        username: joi.string().max(25).required(),
        password: joi.string().min(8).max(50).required(),
        confirm_password: joi.string().min(8).max(50).required(),
        first_name: joi.string().max(50).required(),
        last_name: joi.string().max(50)
    });
    return userSchema.validate(user);
}

exports.User = User;
exports.validateData = validateData;