const express = require('express');
const router = express.Router();
const auth = require('../auth');
const playlistSongsController = require('../controller/playlistSongsController');

router.post('/add', auth.authorization,playlistSongsController.add);
router.get('/list',auth.authorization,playlistSongsController.getAll)
router.put('/delete/:id', auth.authorization,playlistSongsController.delete);
router.put('/deleteall', auth.authorization,playlistSongsController.deleteAll);
module.exports = router
