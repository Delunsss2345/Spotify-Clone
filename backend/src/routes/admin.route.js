const { Router } = require("express") ;
const { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } = require("@controllers/admin.controller") ;
const { requireAdmin , protectRoute } = require("@middlewares/auth.middleware") ;

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

module.exports = router;
