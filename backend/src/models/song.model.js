const mongoose  = require('mongoose')

const songSchema = new mongoose.Schema({
    title : {
        type:String , 
        required : true 
    } , 
    artist : {
        type: String, 
        required : true 
    } , 
    imageUrl : {
        type : String , 
        required : true 
    } , 
    audioUrl : {
        type :String , 
        require : true
    }, 
    duration : {
        type :Number , 
        required : true 
    } , 
    albumId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Album' , 
        required : false
    }
}, {timestamps : true}) ;

const Song = new mongoose.model('Song' , songSchema) ; 

module.exports = Song