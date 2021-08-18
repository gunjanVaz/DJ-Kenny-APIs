const express = require('express');
const router = express.Router();
const auth = require('../auth');
const galleryController = require('../controller/galleryController');

// router to add image in gallery
router.post('/uploadImage', auth.authorization, galleryController.addImage);

// router to get all the images
router.get('/images', auth.authorization, galleryController.getImage);

//router to update an image
router.put('/update/:id', auth.authorization, galleryController.updateImage);

//router to delete an image
router.put('/delete/:id', galleryController.deleteImage);

module.exports = router
