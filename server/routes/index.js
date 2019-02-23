//      * File Name: index.js
//      * Author Name: Shefali Sharma, 
//      * StudentID: 300973745
//      * Web App name: comp308-w2019-midterm-300973745

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the game model
let book = require('../models/books');

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    books: ''
   });
});

module.exports = router;
