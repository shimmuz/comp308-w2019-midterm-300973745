//      * File Name: books.js
//      * Author Name: Shefali Sharma, 
//      * StudentID: 300973745
//      * Web App name: comp308-w2019-midterm-300973745

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('favourite', gamesSchema);
