
const Album =  require('@models/album.model')
const AlbumService = require("@services/album.service") ; 
const asyncHandler = require('@utils/asyncHandler.util')


const getAllAlbums = asyncHandler(async (req , res) => {
    const albums = await AlbumService.getAllAlbums() ; 
    res.success(200 , albums , 'Lấy Albums thành công') ; 
}) ;



const getAlbumById = asyncHandler(async (req , res) => {
    const {albumId} = req.params ; 
    const album = await AlbumService.getAlbumById(albumId) ; 
    
    res.success(200 , album , 'Lấy Album thành công') ; 
})

module.exports = {getAllAlbums , getAlbumById } ;