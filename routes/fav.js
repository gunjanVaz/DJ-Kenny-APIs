const express = require('express');
const router = express.Router();
const auth = require('../auth');
const favController = require('../controller/favController');

// router to get all the images
router.post('/', auth.authorization, favController.fav);
router.get('/get', auth.authorization, favController.get);

module.exports = router
