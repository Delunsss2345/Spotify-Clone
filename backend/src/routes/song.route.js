const { Router } = require("express");
const { getAllSongs, getFeaturedSongs } = require("@controllers/song.controller.js");
const { protectRoute, requireAdmin } = require("@middlewares/auth.middleware.js");

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);

module.exports = router;
