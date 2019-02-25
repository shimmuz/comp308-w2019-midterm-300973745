//      * File Name: index.js
//      * Author Name: Shefali Sharma, 
//      * StudentID: 300973745
//      * Web App name: comp308-w2019-midterm-300973745

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');
// define the book model
let book = require('../models/books');
//define the user Model
let userModel = require("../models/users");
let user = userModel.User; //alias

//prevents non-logged in users from accessing book list
function requireAuth(req, res, next){
  console.log(req.user.username);
  //check if user is loged in
  if(!req.isAuthenticated()) {
      return res.redirect('/');
  }
 
  next();
}
/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

/* Get - displays the login page */
router.get('/login',(req,res,next) => {
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
    
  } else {
    return res.redirect('/');  //redirects to home
  }
});

/* Post - process the login page*/
router.post('/login',(req,res,next)=>{
  passport.authenticate('local', 
    (err,user,info) => {
      //server error?
      if (err){
        return next(err);
      }
      // is theer a user login error?
      if(!user){
        req.flash("loginMessage","Authentication Error");
        return res.redirect('/login');
      }
      req.logIn(user,(err) => {
        //server error?
        if(err){
          return next(err);
        }
        return res.redirect('/books');
       
        });
      })
    });
   

/* Get - displays the user registartion page*/
router.get('/register',(req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
  } else {
    return res.redirect('/');
  }
});
/* Pos --process the user registartion page*/
router.post('/register',(req, res, next) => {
  let newUser = new user({
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });
  user.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New USer");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists !");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : ""
      });
    } else{
      //if no error exists, then registartion is successful

      //redirect the user
      return passport.authenticate("local")(req, res, () => {
        res.redirect('/books');
      });
    }

    
    
  });
});
/* Get - perfrom usre logout */
router.get('/logout',(req, res, next) => {
  req.logout();
  res.redirect('/');
});
module.exports = router;
