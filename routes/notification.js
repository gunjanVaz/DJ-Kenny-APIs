const express = require('express');
const router = express.Router();
const auth = require('../auth');
const notificationController = require('../controller/notificationController');

// router to add notification
router.post('/upload', auth.authorization, notificationController.addNotification);

// router to get all the notifications
router.get('/notifications', auth.authorization, notificationController.getNotification);

//router to update a notification
router.put('/update/:id', auth.authorization, notificationController.updateNotification);

//router to delete a notification
router.put('/delete/:id', auth.authorization, notificationController.deleteNotification);

module.exports = router
