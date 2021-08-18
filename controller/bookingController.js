const bookingController = {}
const mongoose = require('mongoose')
const { Booking } = require('../model/bookingModel')


//controller to add an booking
bookingController.add = async (req, res) => {
    try {
        let emailRegex = /\S+@\S+\.\S+/;
        const email = req.body.email
        const booking = new Booking(req.body)
        const bookingIn = await Booking.find({ user_id: booking.user_id, is_deleted: false })
        let phoneNumber = req.body.phoneNumber

        if (bookingIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Booking Already Done with For This User"
            }
            res.status(400).json(response)
        }

        else if (!booking.user_id || !booking.name || !booking.email || !booking.phoneNumber) {
            let response = {
                "status": 400,
                "message": "Please Enter User ID, Name, Email Address And Phone Number"
            }
            res.status(400).json(response)
        }
        else if (!emailRegex.test(email)) {
            let response = {
                "status": 400,
                "message": "Email Not In Proper Format"
            }
            res.status(400).json(response)
        }
        else if (phoneNumber.toString().length != 14) {
            let response = {
                "status": 400,
                "message": "Please Enter Valid Phone Number"
            }
            res.status(400).json(response)
        }
        else {
            await booking.save((err) => {
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
                        "message": "Thank You!! Your booking request has been forwarded successfully"
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
//controller to get all the bookings
bookingController.get = async (req, res) => {
    try {
        const bookings = await Booking.find({ is_deleted: false })
        let response = {
            "status": 200,
            "message": "Available Bookings",
            "data": bookings
        }
        res.status(200).json(response)

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
//controller for updating booking
bookingController.update = async (req, res) => {
    try {
        let emailRegex = /\S+@\S+\.\S+/;
        const email = req.body.email
        let phoneNumber = req.body.phoneNumber
        const bookingId = mongoose.Types.ObjectId(req.params.id)
        const booking = await Booking.find({ _id: bookingId, is_deleted: false })
        if (booking.length != 1) {
            let response = {
                "status": 404,
                "message": "Booking Not Found",
            }
            res.status(404).json(response)
        }
        else if (!booking[0].user_id || !booking[0].name || !booking[0].email || !booking[0].phoneNumber) {
            let response = {
                "status": 400,
                "message": "Please Enter User ID, Name, Email Address And Phone Number"
            }
            res.status(400).json(response)
        }
        else if (!emailRegex.test(email)) {
            let response = {
                "status": 400,
                "message": "Email Not In Proper Format"
            }
            res.status(400).json(response)
        }
        else if (phoneNumber.toString().length != 14) {
            let response = {
                "status": 400,
                "message": "Please Enter Valid Phone Number"
            }
            res.status(400).json(response)
        }
        else {
            booking[0].set(req.body)
            let updatedBooking = await booking[0].save();
            let response = {
                "status": 200,
                "message": "Booking Updated Successfully",
                "Updated Booking": updatedBooking
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

//controller for deleting an booking
bookingController.delete = async (req, res) => {
    try {
        const bookingId = mongoose.Types.ObjectId(req.params.id)
        const booking = await Booking.find({ _id: bookingId, is_deleted: false })
        if (booking.length != 1) {
            let response = {
                "status": 404,
                "message": "Booking Not Found",
            }
            res.status(404).json(response)
        }
        else {
            booking[0].set({ is_deleted: true })
            let updatedBooking = await booking[0].save();
            let response = {
                "status": 200,
                "message": "Booking Deleted Successfully",
                "data": updatedBooking
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

module.exports = bookingController