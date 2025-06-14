const Song = require("@models/song.model") ; 
const Album = require("@models/album.model") ; 
const User = require("@models/user.model") ; ;
class StatService {
    static async getStats() {
        const [totalSongs, totalAlbums, totalUsers, uniqueArtistsList] = await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),
        Song.aggregate([
            { $project: { artist: 1 } }, //Lấy tên tác giả từ song
            {
                $unionWith: {
                    coll: "albums", //Lấy từ bảng albums
                    pipeline: [{ $project: { artist: 1 } }] //Lấy mỗi tên tác giả
                }
            },
            { $group: { _id: "$artist" } } //gộp lại ra mảng
            ])
        ]);

    const uniqueArtists = uniqueArtistsList.length; //ra độ dài 
    return [totalSongs, totalAlbums,uniqueArtists ,  totalUsers] ; 
    }
}

module.exports = StatService 