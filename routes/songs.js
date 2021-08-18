const express = require('express');
const songController = require('../controller/songController');
const multer = require('multer');
const router = express.Router();
const uploadSong=require('../middlewares/uploadSong.js')

//router to upload a song
router.post('/addSong',uploadSong.single('song'),songController.add);

//router to view all the songs
router.get('/getAll',songController.get);

module.exports = router;