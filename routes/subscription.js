const express = require('express');
const router = express.Router();
const auth = require('../auth');
const subscriptionController = require('../controller/subscriptionController');

router.post('/', auth.authorization,subscriptionController.add);
router.put('/delete/:id', auth.authorization,subscriptionController.delete);

module.exports = router
