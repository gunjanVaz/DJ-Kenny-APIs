const express = require('express');
const router = express.Router();
const auth = require('../auth');
const biographyController = require('../controller/biographyController');

// router to add booking in gallery
router.post('/', auth.authorization,biographyController.add);

// router to get all the bookings
router.get('/list',auth.authorization, biographyController.get);


//router to delete an booking
router.put('/delete/:id', auth.authorization,biographyController.delete);

module.exports = router
