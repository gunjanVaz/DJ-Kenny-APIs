const express = require('express');
const router = express.Router();
const auth = require('../auth');
const categoryItemController = require('../controller/categoryItemController');

// router to add image in gallery
router.post('/upload',auth.authorization,categoryItemController.add);

//router to get all the categories
router.get('/all',auth.authorization,categoryItemController.getAll)

//router to update an image
router.put('/update/:id',auth.authorization,categoryItemController.update);

//router to delete an image
router.put('/delete/:id',auth.authorization,categoryItemController.delete);

module.exports = router
