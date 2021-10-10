require('dotenv').config()

const express=require("express"),
    app=express(),
	bodyParser=require("body-parser"),
    mysql = require('mysql'),
	passport=require('passport');

    const flash=require("connect-flash");

// Database Connection

const connection = mysql.createConnection({
    host: process.env.dbHost,
    user: process.env.dbUsername,
    password: process.env.dbPassword,
    database: process.env.dbName
});

connection.connect((err) => {
    if (err) throw err;
})

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
	console.log("Server Has Started Listening at localhost:3000!!!")
});