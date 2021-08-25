const express = require('express');
const router = express.Router();
const auth = require('../auth');
const playlistController = require('../controller/playlistController');

router.post('/add', auth.authorization,playlistController.add);
router.get('/list',auth.authorization,playlistController.getAll)
router.put('/delete/:id', auth.authorization,playlistController.delete);

module.exports = router
