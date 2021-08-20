const express = require('express');
const router = express.Router();
radioController=require('../controller/radioController')
// router to add a video
router.post('/upload',auth.authorization,radioController.add);
//router to get all the videos
router.get('/all',auth.authorization,radioController.getAll)
//router to update a video
router.put('/update/:id',auth.authorization,radioController.update);

//router to delete a video
router.put('/delete/:id',auth.authorization,radioController.delete);

module.exports = router

