const express = require('express');
const router = express.Router();
const auth = require('../auth');
const homeItemsController = require('../controller/homeItemsController');
router.get('/', auth.authorization,homeItemsController.get)

module.exports = router
