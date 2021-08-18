const express = require('express');
const router = express.Router();
const auth = require('../auth');
const menuController = require('../controller/menuController');

// router to add image in gallery
router.post('/uploadItem', auth.authorization, menuController.addItem);

// router to get all the images
router.get('/', auth.authorization, menuController.getItem);

//router to update an image
router.put('/update/:id', auth.authorization, menuController.updateItem);

//router to delete an image
router.put('/delete/:id', auth.authorization, menuController.deleteItem);

module.exports = router
