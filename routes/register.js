const express = require("express");
const { postRegister, getRegister } = require("../controllers/register.js");
const authenticationMiddleware = require("../middlewares/auth.js");
const router = express.Router();

router.post("/post", postRegister);
router.get("/get", authenticationMiddleware, getRegister);

module.exports = router;
