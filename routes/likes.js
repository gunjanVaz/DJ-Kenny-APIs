const express = require('express');
const router = express.Router();
const auth = require('../auth');
const likesController = require('../controller/likesController');

// router to get all the images
router.post('/', auth.authorization, likesController.like);

module.exports = router
