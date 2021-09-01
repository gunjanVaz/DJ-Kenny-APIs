const express = require('express');

const router = express.Router();
const legalDetails = require('./legalDetails');
const uploads = require('./uploads');
const users = require('./users');
const songs = require('./songs');
const gallery = require('./gallery');
const notification = require('./notification');
const ads = require('./ads');
const menu = require('./menu');
const category = require('./category');
const subcategory = require('./subcategory');
const categoryitem = require('./categoryItem');
const videos = require('./videos');
const radio = require('./radio');
const menuitems = require('./menuitems');
const catIt = require('./catIt');
const cartItdetails = require('./cartItdetails');
const likes = require('./likes');
const shares = require('./shared');
const booking = require('./booking');
const playlist = require('./playlist');
const playlistsongs = require('./playlistsongs');
const biography = require('./biography');
const subscription = require('./subscription');
const links = require('./links');
const fav = require('./fav');
const slider = require('./slider');
const homeitems = require('./homeitems');
const headermenu = require('./headermenu');


router.use('/djkenny/api/legalDetails', legalDetails)
router.use('/djkenny/api/uploads', uploads)
router.use('/djkenny/api/users', users)
router.use('/djkenny/api/songs', songs)
router.use('/djkenny/api/gallery', gallery)
router.use('/djkenny/api/notification', notification)
router.use('/djkenny/api', ads)
router.use('/djkenny/api/menu', menu)
router.use('/djkenny/api/category', category)
router.use('/djkenny/api/subcategory', subcategory)
router.use('/djkenny/api/categoryitem', categoryitem)
router.use('/djkenny/api/videos', videos)
router.use('/djkenny/api/radio', radio)
router.use('/djkenny/api/booking', booking)
router.use('/djkenny/api/menuitems', menuitems)
router.use('/djkenny/api/categoryitems', catIt)
router.use('/djkenny/api/categoryitemdetails', cartItdetails)
router.use('/djkenny/api', likes)
router.use('/djkenny/api', shares)
router.use('/djkenny/api/playlist', playlist)
router.use('/djkenny/api/playlistsongs', playlistsongs)
router.use('/djkenny/api/biography', biography)
router.use('/djkenny/api/subscription', subscription)
router.use('/djkenny/api', links)
router.use('/djkenny/api/favourite', fav)
router.use('/djkenny/api', slider)
router.use('/djkenny/api/homeitems', homeitems)
router.use('/djkenny/api/headermenu', headermenu)

module.exports = router;
