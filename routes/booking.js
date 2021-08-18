const express = require('express');
const router = express.Router();
const auth = require('../auth');
const bookingController = require('../controller/bookingController');

// router to add booking in gallery
router.post('/', auth.authorization,bookingController.add);

// router to get all the bookings
router.get('/list',auth.authorization, bookingController.get);

//router to update an booking
router.put('/update/:id', auth.authorization,bookingController.update);

//router to delete an booking
router.put('/delete/:id', auth.authorization,bookingController.delete);

module.exports = router
