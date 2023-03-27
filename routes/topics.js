const getAllTopicsController = require("../controllers/getAllTopicsController");
const express = require("express");
const router = express.Router();

router.get('/', getAllTopicsController);

module.exports = router;
