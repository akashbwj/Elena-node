
const passport = require('passport');
const { User, validateData } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Routes


router.get("/", (req, res) => {
    res.render("home");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/login", (req, res) => {
    let user = User.findOne({username: req.body.username });
    if (user) {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (result) {
                passport.authenticate('local', {
                    successRedirect: "/",
                    failureRedirect: "login"
                })
            }
            else {
                return res.status(400).send("Invalid Password!");
            }
        })
    }
    else {
        return res.status(400).send("Username Does not Exist!");
    }
})

router.post("/register", (req, res) => {

    // validate the request body according to schema.
    const { error } = validateData(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // check if username already exists.
    let username = User.findOne({username: req.body.username });
    console.log(username)
    if (username) {
        return res.status(400).send("Username already exists!");
    }

    // check if email id already exists.
    let email = User.findOne({email: req.body.emailId });
    if (email) {
        return res.status(400).send("Email ID already exists!");
    }

    if (req.body.password !== req.body.confirm_password) {
        return res.status(400).send("Password do not match!");
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        var hashed_password = hash;
    });

    console.log(hashed_password);

    user = new User({
        email: req.body.emailId,
        username: req.body.username,
        password: hashed_password, 
        isAdmin: false,
        firstName: req.body.first_name,
        lastName: req.body.last_name,
    });

    user.save();
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })

    res.redirect("/");
})

module.exports = router;

