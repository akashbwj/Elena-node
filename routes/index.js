
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
    
    // Check if username exists in DB
    (async function checkUserExists() {
        let user = await User.findOne({where: {email: req.body.email }});
       
        if (user) {
            
            // Check if the password is correct.
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result) {
                    passport.serializeUser(function(user, done) {
                        done(null, user);
                      });
                      passport.deserializeUser(function(user, done) {
                        done(null, user);
                      });
                    req.login(user.email, function (err) {
                        if (err){
                            req.flash("error",err.message);
                            return res.redirect('/login');
                        }
                        req.flash("success","Logged in successfully!");
                        return res.redirect("/");
                    })
                }
                else if (err) {
                    req.flash("error",err.message);
                    return res.redirect('/login');
                }
                else {
                    req.flash("error","Invalid password! Please try again.");
                    return res.redirect('/login');
                }
            })
        }

        else {
            req.flash("error","There is no user account with this email. Kindly register on our site first.");
            return res.redirect('/login');
        }
    })();
})


router.post("/register", (req, res) => {

    // validate the request body according to schema.
    const { error } = validateData(req.body);
    if (error) {
        req.flash("error",error.details[0].message);
        return res.redirect('/register');
    }

    // check if email id already exists.

    (async function isEmailUnique() {
        let email = await User.findOne({where: {email: req.body.email}});
        if (email === null) {
            return true;
        }
        return false;
    })()
    .then(result => {
        if (!result) {
            req.flash("error","Email id already exists. Kindly login.");
            return res.redirect('/register');
        }

        if (req.body.password !== req.body.confirm_password) {
            req.flash("error","Passwords do not match!");
            return res.redirect('/register');
        }
    
        const user = User.build({
            email: req.body.email,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            password: "dump", 
            isAdmin: false, 
            resetPasswordToken: null,
            resetPasswordExpires: null
        })
    
        // hash the password before storing in DB.
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            user.password = hash;
            await user.save();
            // console.log("hash:", hash);
            
        });

        // login user.
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    
        res.redirect("/");
    })

})

router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success","Logged out successfully!");
    return res.redirect("/");
})

module.exports = router;

