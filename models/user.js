
// const mongoose = require('mongoose');
// const joi = require('joi');

// const { Sequelize, DataTypes } = require('sequelize');


// const sequelize = new Sequelize('elena', 'root', 'password', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });


// (async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// })();


// const User = sequelize.define('User', {
//     firstName: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: DataTypes.STRING,
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     password: {
//         type: DataTypes.STRING(1234),
//         allowNull: false
//     },
//     isAdmin: {
//         type: DataTypes.BOOLEAN
//     },
//     resetPasswordToken: {
//         type: DataTypes.STRING(1234)
//     },
//     resetPasswordExpires: {
//         type: DataTypes.DATE
//     }
// });

// (async function syncTable() {
//     await User.sync();
// })();


// // const User = mongoose.model('User', new mongoose.Schema({
// //     email: { 
// //         type: String, 
// //         unique: true,
// //         required: true,
// //         maxlength: 75
// //     },
// //     username: { 
// //         type: String, 
// //         unique: true,
// //         required: true,
// //         maxlength: 25
// //      },
// //     password: { 
// //         type: String, 
// //         required: true,
// //         minlength: 8,
// //         maxlength: 1024
// //      },
// //     isAdmin: { type: Boolean, default: false },
// //     firstName: { 
// //         type: String, 
// //         required: true,
// //         maxlength: 50
// //      },
// //     lastName: { type: String, maxlength: 50 }
// // }, {timestamp: true}));


// function validateData(user) {
//     const userSchema = joi.object({
//         email: joi.string().max(75).required(),
//         password: joi.string().min(8).max(50).required(),
//         confirm_password: joi.string().min(8).max(50).required(),
//         first_name: joi.string().max(50).required(),
//         last_name: joi.string().max(50)
//     });
//     return userSchema.validate(user);
// }

// exports.User = User;
// exports.validateData = validateData;