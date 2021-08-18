const notificationController = {}
const mongoose = require('mongoose')
const { Notification } = require('../model/notificationModel')

//controller to add an image
notificationController.addNotification = async (req, res) => {
    try {
        const notification = new Notification(req.body)
        const notificationIn = await Notification.find({ title: notification.title, message: notification.message, is_deleted: false })
        if (notificationIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Notification Exists"
            }
            res.status(400).json(response)
        }
        else if (!notification.title || !notification.message) {
            let response = {
                "status": 400,
                "message": "Please Enter The Title And Message Of The Notification"
            }
            res.status(400).json(response)
        }
        else {
            await notification.save((err) => {
                if (err) {
                    let response = {
                        "status": 500,
                        "message": "Error In Saving Data",
                        "Error": [err]
                    }
                    res.status(500).json(response)
                }
                else {
                    let response = {
                        "status": 200,
                        "message": "Notification Saved Successfully"
                    }
                    res.status(200).json(response)
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        if (err.errors) {
            let errors = [];
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name) {
                    errors.push({
                        name: key,
                        message: value.message
                    });
                }
            });
            return res.status(400).send(errors);
        } else {
            console.log(err)
            let response = {
                "status": 500,
                "message": "Internal Server Error",
                "Error": [err.message]
            }
            res.status(500).json(response)
        }
    }
}
//controller to get all the notifications
notificationController.getNotification = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const notifications = await Notification.find({ is_deleted: false })
        if (page && limit) {
            let startIndex = (page - 1) * limit
            let endIndex = page * limit

            const resultNotifications = notifications.slice(startIndex, endIndex)

            let response = {
                "status": 200,
                "message": "Success",
                "data": resultNotifications,
                "per_page": limit,
                "current_page": page,
                "last_page": Math.ceil(resultNotifications.length / limit)
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 200,
                "message": "Available Notifications",
                "data": notifications
            }
            res.status(200).json(response)
        }

    }
    catch (err) {
        let response = {
            "status": 500,
            "message": "Internal Server Error",
            "Error": [err.message]
        }
        res.status(500).json(response)
    }
}
//controller for updating an notification
notificationController.updateNotification = async (req, res) => {
    try {
        const notificationId = mongoose.Types.ObjectId(req.params.id)
        const notification = await Notification.find({ _id: notificationId, is_deleted: false })
        if (notification.length != 1) {
            let response = {
                "status": 404,
                "message": "Notification Not Found",
            }
            res.status(404).json(response)
        }
        else {
            notification[0].set(req.body)
            let updatedNotification = await notification[0].save();
            let response = {
                "status": 200,
                "message": "Notification Updated Successfully",
                "Updated Image": [
                    {
                        "title": updatedNotification.title,
                        "message": updatedNotification.message,
                    }
                ]
            }
            res.status(200).json(response)
        }
    }
    catch (err) {
        console.log(err);
        if (err.errors) {
            let errors = [];
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name) {
                    errors.push({
                        name: key,
                        message: value.message
                    });
                }
            });
            return res.status(400).send(errors);
        } else {
            console.log(err)
            let response = {
                "status": 500,
                "message": "Internal Server Error",
                "Error": [err.message]
            }
            res.status(500).json(response)
        }
    }
}

//controller for deleting an image
notificationController.deleteNotification = async (req, res) => {
    try {
        const notificationId = mongoose.Types.ObjectId(req.params.id)
        const notification = await Notification.find({ _id: notificationId, is_deleted: false })
        if (notification.length != 1) {
            let response = {
                "status": 404,
                "message": "Notification Not Found",
            }
            res.status(404).json(response)
        }
        else {
            notification[0].set({ is_deleted: true })
            let updatedNotification = await notification[0].save();
            let response = {
                "status": 200,
                "message": "Notification Deleted Successfully",
                "data": updatedNotification
            }
            res.status(200).json(response)
        }
    }
    catch (err) {
        console.log(err);
        if (err.errors) {
            let errors = [];
            Object.entries(err.errors).forEach(([key, value]) => {
                if (value.name) {
                    errors.push({
                        name: key,
                        message: value.message
                    });
                }
            });
            return res.status(400).send(errors);
        } else {
            console.log(err)
            let response = {
                "status": 500,
                "message": "Internal Server Error",
                "Error": [err.message]
            }
            res.status(500).json(response)
        }
    }
}
module.exports = notificationController
