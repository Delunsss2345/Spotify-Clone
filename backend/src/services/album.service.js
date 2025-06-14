const Album = require("@models/album.model");
const ApiError = require("@utils/apiError.util");

//Service
class AlbumService  {
    static async getAllAlbums() {
        const albums = await Album.find() ; 
        if(!albums) {
            throw new ApiError(404 ,'Không tìm thấy ablums') ; 
        }
        return albums ; 
    }

    static async getAlbumById(albumId) {
        const album = await Album.findById(albumId).populate('songs') ; 
        if(!album) {
            throw new ApiError(404 ,'Không tìm thấy album id') ; 
        }

        return album ; 
    }
}

module.exports = AlbumService ; 