var express = require("express"),
    app = express(),
    request = require("request"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//Passport configuration
app.use(require("express-session")({
   secret: "Thank god it is friday, man!",
   resave: false,
   saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   next();
});

//DB configuration

mongoose.connect("mongodb://localhost/yelpcamp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
// seedDB(); ssed the database

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp has started"); 
});