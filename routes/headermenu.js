const express = require('express');
const router = express.Router();
const auth = require('../auth');
const headerMenuController = require('../controller/headermenu');
router.get('/',headerMenuController.get)

module.exports = router
