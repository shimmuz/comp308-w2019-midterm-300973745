//      * File Name: users.js
//      * Author Name: Shefali Sharma, 
//      * StudentID: 300973745
//      * Web App name: comp308-w2019-midterm-300973745

//require modules for user model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let userSchema = mongoose.Schema({
    username:{
        type: String,
        default:"",
        trim:true,
        required:"username is required"
    },
     /*taken out because password will be encrypted by passport-local-mongoose
    password:{
        type:String,
        default:'',
        trim:true,
        required: 'password is required'
    }*/
    email:{
        type : String,
        default:"",
        trim : true,
        required :'email is required'
    },
    displayName:{
        type:String,
        default:'',
        trim:true,
        required:'Display name is required'
    },
    created:
    {
        type:Date,
        default:Date.now,
    },
    updated: {
        type: Date,
        default: Date.now
      }
    },
    
    
    {collection:"users"}
        
    );
    let options=({
        missingPasswordError:"Wrong/Missing/Password"
    });
    userSchema.plugin(passportLocalMongoose,options);

    module.exports.User = mongoose.model('User',userSchema);
    
