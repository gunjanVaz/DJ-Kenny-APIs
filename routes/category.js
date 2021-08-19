const express = require('express');
const router = express.Router();
const auth = require('../auth');
const categoryController = require('../controller/categoryController');

// router to add image in gallery
router.post('/uploadItem', auth.authorization,categoryController.add);
//router to get all the categories
router.get('/all',auth.authorization,categoryController.getAll)
// router to get all the images
// router.get('/', categoryController.get);

//router to update an image
router.put('/update/:id', auth.authorization,categoryController.updateCategory);

//router to delete an image
router.put('/delete/:id', auth.authorization,categoryController.delete);

module.exports = router
