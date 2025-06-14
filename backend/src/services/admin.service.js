const CloudinaryUtil = require('@utils/cloudinary.util') ; 
const Song = require('@models/song.model') ; 
const Album = require('@models/album.model') ; 


class AdminService {
    static async createSong (req) {
        if(!req.files || !req.files.audioFile || !req.files.imageFile) {
            throw new ApiError( 400 ,'Cần thêm đầy đủ file') ;
        }

        const {title , artist , albumId , duration} = req.body ; 

        if(!title || !artist) {
           throw new ApiError(400 ,'Cần thêm tên và tác giả') ;
        }

        const audioFile = req.files.audioFile ;
        const imageFile = req.files.imageFile ;

        const audioUrl = await CloudinaryUtil.uploadCloudinary(audioFile) ; 
        const imageUrl = await CloudinaryUtil.uploadCloudinary(imageFile) ; 


        const song = await Song({
            title , 
            artist , 
            imageUrl ,
            audioUrl , 
            duration , 
            albumId : albumId || null
        }) ; 

        await song.save() ; 

        if(albumId) { //Thuộc album thì thêm id nhạc vào album đó
            await Album.findByIdAndUpdate(albumId , {
                $push : {songs : song._id}
            })
        } 
        return song ; 
    }

    static async deleteSong (id) {
        const song = await Song.findById(id) ;

        if(!song) {
            throw new ApiError(404 , 'Không có nhạc để xoá') ; 
        }

        if(song.albumId) {
            await Album.findByIdAndUpdate(song.albumId , 
                {$pull : {songs : id}}
            ) ; 
        }

        await Song.findByIdAndDelete(id) ; 
    }

    static async createAlbum(req) {
        const {title , artist , releaseYear} = req.body ; 
        const {imageFile} = req.files ;

        const imageUrl = await CloudinaryUtil.uploadCloudinary(imageFile) ; 
        const album = new Album({
            title , artist , releaseYear , imageUrl 
        })

        await album.save() ;   

        return album ; 
    }
    static async deleteAlbum(id) {
        await Song.deleteMany({albumId : id}) ; 
        await Album.findByIdAndDelete(id) ; 
    }
}

module.exports = AdminService ; 