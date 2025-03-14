const express = require("express");
const { postRegister, getRegister } = require("../controllers/register.js");
const router = express.Router();

router.post("/post", postRegister);
router.get("/get", getRegister);

module.exports = router;
