
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
                        if (err) throw err;
                        return res.redirect("/");
                    })
                }
                else if (err) {
                    console.log(err);
                }
                else {
                    return res.status(400).send("Invalid Password!");
                }
            })
        }

        else {
            return res.status(400).send("Username Does not Exist!");
        }
    })();
})


router.post("/register", (req, res) => {

    // validate the request body according to schema.
    const { error } = validateData(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
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
            return res.status(400).send("Email ID exists!");
        }

        if (req.body.password !== req.body.confirm_password) {
            return res.status(400).send("Password do not match!");
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
            console.log("hash:", hash);
            
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
    return res.redirect("/");
})

module.exports = router;

