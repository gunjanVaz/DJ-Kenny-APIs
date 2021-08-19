const express = require('express');
const router = express.Router();
videoController=require('../controller/videoController')
// router to add a video
router.post('/upload',videoController.add);
//router to get all the videos
router.get('/all',videoController.getAll)
//router to update a video
router.put('/update/:id',videoController.update);

//router to delete a video
router.put('/delete/:id',videoController.delete);

module.exports = router

