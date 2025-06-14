const { Router } = require("express");
const authCallback  =  require("@controllers/auth.controller");

const router = Router();

router.post("/callback", authCallback);

module.exports = router;
