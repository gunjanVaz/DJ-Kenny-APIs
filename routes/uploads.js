const express = require('express');
const multer = require('multer');
const uploadsController = require('../controller/uploadsController');
const router = express.Router();
const upload=require('../middlewares/uploads.js')

//to upload an image
router.post('/',upload.single('image'),uploadsController.uploads);

//to get an image from storage/uploads
router.get('/:filename',uploadsController.get)

module.exports=router;
