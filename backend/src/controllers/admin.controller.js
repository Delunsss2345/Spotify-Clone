const asyncHandler = require('@utils/asyncHandler.util');
const AdminService = require('@services/admin.service') ; 

const checkAdmin = (req , res) => {
    res.success(200 , {admin : true}) ; 
}

const createSong = asyncHandler(async (req , res , next) => {
    const song = await AdminService.createSong(req)
    res.success(201 , song , 'Tạo nhạc thành công') ; 
})

const deleteSong = asyncHandler(async (req , res , next) => {
    const {id} = req.params ;
    console.log(id) ; 
    await AdminService.deleteSong(id) ; 
    res.success(200) ;  
})

const createAlbum = asyncHandler(async (req , res , next) => {
    const album = await AdminService.createAlbum(req); 
    res.success(201 , album , 'Tạo album thành công') ;
})

const deleteAlbum = async (req , res , next) => {
    const {id} = req.params ; 
    await AdminService.deleteAlbum(id) ; 
    res.success(200 , "Xoá album thành công");
}

module.exports = {checkAdmin , createAlbum  ,createSong , deleteAlbum , deleteSong}