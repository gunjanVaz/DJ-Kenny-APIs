const express = require('express');
const router = express.Router();
const auth = require('../auth');
const likesController = require('../controller/likesController');

// router to get all the images
router.post('/likes', auth.authorization, likesController.like);
router.post('/likevideo', auth.authorization, likesController.vidlike);

module.exports = router
