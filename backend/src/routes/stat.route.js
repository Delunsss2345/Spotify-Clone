const {Router} = require('express')
const getStats  = require("@controllers/stat.controller");
const {protectRoute , requireAdmin} = require('@middlewares/auth.middleware') ; 
const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

module.exports = router;
