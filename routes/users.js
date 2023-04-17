const getUsersController = require('../controllers/getUsersController');
const express = require('express');
const router = express.Router();


router.get('/', getUsersController);

module.exports = router;

