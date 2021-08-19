const express = require('express');
const router = express.Router();
radioController=require('../controller/radioController')
// router to add a video
router.post('/upload',radioController.add);
//router to get all the videos
router.get('/all',radioController.getAll)
//router to update a video
router.put('/update/:id',radioController.update);

//router to delete a video
router.put('/delete/:id',radioController.delete);

module.exports = router

