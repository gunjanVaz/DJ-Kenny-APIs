const express = require('express');
const router = express.Router();
const auth = require('../auth');
const googleadsController = require('../controller/googleadsController');

// router to get google adds
router.get('/googleads', googleadsController.getAds);
// router to get sharemyapps links
router.get('/sharemyapp', auth.authorization,googleadsController.getShare);
// router to get social media links
router.get('/socialmedia', auth.authorization,googleadsController.getLink);

router.post('/addShare', googleadsController.addShare);
router.post('/addAd', googleadsController.addAd);
router.post('/addSocial', googleadsController.addLink);


module.exports = router
