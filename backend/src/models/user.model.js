const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName : {
        type:String , 
        required : true 
    } , 
    imageUrl : {
        type: String, 
        required : true 
    } , 
    clerkId : {
        type : String , 
        required : true , 
        unique : true 
    }
}, {timestamps : true}) ;

const User = new mongoose.model('User' , userSchema) ; 

module.exports = User ;