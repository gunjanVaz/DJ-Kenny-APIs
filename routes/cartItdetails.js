const express = require('express');
const router = express.Router();
const auth = require('../auth');
const catItdetailsController = require('../controller/catItdetailsController');

router.get('/', catItdetailsController.get);

module.exports = router
