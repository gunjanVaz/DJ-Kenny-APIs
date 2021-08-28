const express = require('express');
const router = express.Router();
const auth = require('../auth');
const sharesController = require('../controller/sharedController');

// router to get all the images
router.post('/shared', auth.authorization, sharesController.shared);

module.exports = router
