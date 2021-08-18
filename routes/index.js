const express = require('express');

const router = express.Router();
const legalDetails = require('./legalDetails')
const uploads = require('./uploads')
const users = require('./users')
const songs = require('./songs')
const gallery = require('./gallery')
const notification = require('./notification')
const ads = require('./ads')
const menu = require('./menu')
const category = require('./category')
const videos = require('./videos')
const booking = require('./booking')
const biography = require('./biography')

router.use('/djkenny/api/legalDetails', legalDetails)
router.use('/djkenny/api/uploads', uploads)
router.use('/djkenny/api/users', users)
router.use('/djkenny/api/songs', songs)
router.use('/djkenny/api/gallery', gallery)
router.use('/djkenny/api/notification', notification)
router.use('/djkenny/api', ads)
router.use('/djkenny/api/menu', menu)
router.use('/djkenny/api/menuitems', category)
router.use('/djkenny/api/videos', videos)
router.use('/djkenny/api/booking', booking)
router.use('/djkenny/api/biography', biography)

module.exports = router;

