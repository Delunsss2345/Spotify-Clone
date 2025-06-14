const mongoose  = require('mongoose')

const messageSchema = new mongoose.Schema({
    senderId : {
        type:String , 
        required : true 
    } ,  //Clear Id
    receiverId : {
        type: String, 
        required : true 
    } ,  //Clear Id
    content : {
        type : String , 
        required : true
    }
}, {timestamps : true}) ;

const Message = new mongoose.model('Message' , messageSchema) ; 


module.exports = Message