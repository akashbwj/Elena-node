
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
    isAdmin: { type: Boolean, default: false },
    firstName: String,
    LastName: String,
}, {timestamp: true});