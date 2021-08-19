const express = require('express');
const router = express.Router();
const auth = require('../auth');
const subcategoryController = require('../controller/subcategoryController');

// router to add image in gallery
router.post('/uploadItem',auth.authorization, subcategoryController.add);
//router to get all the categories
router.get('/all',auth.authorization,subcategoryController.getAll)
// router to get all the images
// router.get('/', categoryController.get);

//router to update an image
router.put('/update/:id',auth.authorization, subcategoryController.updateCategory);

//router to delete an image
router.put('/delete/:id',auth.authorization, subcategoryController.delete);

module.exports = router
