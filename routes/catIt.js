const express = require('express');
const router = express.Router();
const auth = require('../auth');
const catItController = require('../controller/catItController');

router.get('/', catItController.get);

module.exports = router
