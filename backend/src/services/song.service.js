const Song = require("@models/song.model");

class SongService {
    static async getAllSongs () {
        const songs = await Song.find().sort({createdAt: -1}) ;
        return songs ; 
    }
    static async getFeaturedSongs() {
        const songs = await Song.aggregate([
            {$sample : {size:6}} ,
            {$project : {
               _id : 1 , 
               title : 1 , 
               artist : 1 , 
               imageUrl : 1 , 
               audioUrl : 1 
                }}
            ]) ;
        
        return songs ; 
    }
}

module.exports = SongService ; 