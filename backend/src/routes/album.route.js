const { Router } = require('express')
const {getAllAlbums, getAlbumById }  = require('@controllers/album.controller') ; 
const router = Router();

router.get("/",getAllAlbums);
router.get("/:albumId", getAlbumById);

module.exports = router;
