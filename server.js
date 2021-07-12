require('dotenv').config()

const express=require("express"),
    app=express(),
	bodyParser=require("body-parser"),
    // mongoose=require("mongoose"),
    // mysql = require('mysql'),
	passport=require('passport');
	// LocalStrategy=require('passport-local'),
    // passportLocalMongoose=require('passport-local-mongoose'),
	// dbUrl=process.env.DB_URL||"mongodb://localhost:27017/gnss_india";

    const flash=require("connect-flash");

// Database Connection

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log("DataBase Connected");
//     connection.query("CREATE DATABASE IF NOT EXISTS elena", function(err, result) {
//         if (err) throw err;
//         console.log("Database elena Created");
//     });
//     connection.query("USE elena", function(err, result) {
//         if (err) throw err;
//         console.log("Connected to DB elena!");
//     });
// })

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"))

const secret=process.env.SECRET;
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());




app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.success=req.flash("success");
	next();
})

const indexRoutes = require('./routes/index')

app.use("/", indexRoutes);

app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Server Has Started Listening!!!")
});