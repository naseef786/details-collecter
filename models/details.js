const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    studies:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    works:{
        type:String,
        required:true
    },
    hobbies:{
        type:String,
        required:true
    }
    
   
    // created:{
    //     type:Date,
    //     required:true,
    //     default:Date.now,
    // },
});

module.exports = mongoose.model('Details',userSchema)