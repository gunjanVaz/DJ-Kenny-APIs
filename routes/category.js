const express = require('express');
const router = express.Router();
const auth = require('../auth');
const categoryController = require('../controller/categoryController');

// router to add image in gallery
router.post('/uploadItem', categoryController.add);

// router to get all the images
router.get('/', categoryController.get);

// //router to update an image
// router.put('/update/:id', auth.authorization, galleryController.updateImage);

// //router to delete an image
// router.put('/delete/:id', galleryController.deleteImage);

module.exports = router
