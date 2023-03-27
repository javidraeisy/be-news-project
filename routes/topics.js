const getAllTopicsController = require("../controllers/getTopics.controller");
const express = require("express");
const router = express.Router();

router.get("/", getAllTopicsController);

module.exports = router;
