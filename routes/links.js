const express = require('express');
const router = express.Router();
const auth = require('../auth');
const {instaController,drakeController,supportController} = require('../controller/linksController');

router.post('/drakelink/add', auth.authorization,drakeController.add);
router.get('/drakelink/get', auth.authorization,drakeController.get);
router.put('/drakelink/delete', auth.authorization,drakeController.delete);

router.post('/instagramlink/add',auth.authorization, instaController.add);
router.get('/instagramlink/get', auth.authorization,instaController.get);
router.put('/instagramlink/delete', auth.authorization,instaController.delete);

router.post('/supportlink/add',auth.authorization, supportController.add);
router.get('/supportlink/get', auth.authorization,supportController.get);
router.put('/supportlink/delete', auth.authorization,supportController.delete);

module.exports = router
