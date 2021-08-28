const subscriptionController = {}
const mongoose = require('mongoose')
const { Subscription } = require('../model/subscriptionModel')
const {Users}=require('../model/userModel')

//controller to add an booking
subscriptionController.add = async (req, res) => {
    try {
        
        const subscription = new Subscription(req.body)
        const subIn = await Subscription.find({ user_id: req.user.id, is_deleted: false })
        let userId=req.user.id;
        const users = await Users.find({}).populate('userId', ['email', 'name'])
        users.forEach(user => {
            if(user._id==userId){
                subscription.user_id=user._id
                subscription.email=user.email
                subscription.name=user.name
                subscription.phoneNumber=user.phoneNumber
            }
        })
        subscription.dob=new Date(req.body.dob)
        if (subIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "You Have Already Subscribed"
            }
            res.status(400).json(response)
        }

        else if (!req.user.id || !subscription.email || !subscription.name) {
            let response = {
                "status": 400,
                "message": "Please Enter User Id, Email And Name"
            }
            res.status(400).json(response)
        }
        else {
            await subscription.save((err) => {
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
                        "message": "Thank You!! Your subscription request has been forwarded successfully"
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

subscriptionController.delete = async (req, res) => {
    try {
        const subscriptionId = mongoose.Types.ObjectId(req.params.id)
        const subs = await Subscription.find({ _id: subscriptionId, is_deleted: false })
        if (subs.length != 1) {
            let response = {
                "status": 404,
                "message": "Subscription Not Found",
            }
            res.status(404).json(response)
        }
        else {
            subs[0].set({ is_deleted: true })
            let updatedSubs = await subs[0].save();
            let response = {
                "status": 200,
                "message": "Unsubscribed",
                "data": updatedSubs
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

module.exports = subscriptionController