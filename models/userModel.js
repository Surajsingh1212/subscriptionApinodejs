const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    subscriptionPlan: { 
        type: String, 
        enum: ['1month', '6months', '1year'] 
    }
   
})

module.exports = mongoose.model('User',userSchema)