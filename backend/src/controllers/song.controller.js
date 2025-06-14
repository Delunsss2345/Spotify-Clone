const asyncHandler = require('@utils/asyncHandler.util')

const SongService = require('@services/song.service') ; 

const getAllSongs = asyncHandler(async (req , res) => {
    const songs = await SongService.getAllSongs() ; 
    res.status(200).json(songs) ;  
})

const getFeaturedSongs = asyncHandler(async (req , res) => {
    const songs = await SongService.getFeaturedSongs() ;
    res.status(200).json(songs) ; 
})


module.exports = {getAllSongs , getFeaturedSongs} ; 