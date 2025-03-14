const express = require("express");
const { postRegister } = require("../controllers/register.js");
const router = express.Router();

router.post("/post", postRegister);

module.exports = router;
