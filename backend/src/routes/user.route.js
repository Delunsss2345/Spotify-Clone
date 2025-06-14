const {Router} = require('express')
const { getAllUsers, getMessages } = require("@controllers/user.controller");
const {protectRoute} = require("@middlewares/auth.middleware");

const router = Router();

router.get("/", protectRoute, getAllUsers);
router.get("/messages/:userId", protectRoute, getMessages);

module.exports = router;
 