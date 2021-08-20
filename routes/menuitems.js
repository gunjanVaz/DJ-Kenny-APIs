const express = require('express');
const router = express.Router();
const auth = require('../auth');
const menuItemsController = require('../controller/menuItemsController');

router.get('/', auth.authorization, menuItemsController.get);

module.exports = router
