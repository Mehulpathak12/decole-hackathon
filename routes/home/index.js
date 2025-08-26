const express = require('express');
const router = express.Router();
const helloWorld = require("../../controllers/home/home");
router.get("/", helloWorld);
module.exports = router;