const biographyController = {}
const mongoose = require('mongoose')
const { Biography } = require('../model/biographyModel')

//controller to add an biography
biographyController.add = async (req, res) => {
    try {
        const biography = new Biography(req.body)
        const biographyIn = await Biography.find({is_deleted: false })

        if (!biography.description) {
            let response = {
                "status": 400,
                "message": "Please Enter A Description"
            }
            res.status(400).json(response)
        }
        else if (biographyIn.length > 0) {
            biographyIn[0].set(req.body)
            let updatedBiography = await biographyIn[0].save();
            let response = {
                "status": 200,  
                "message:": "Biography Updated successfully",
                "data": updatedBiography
            }
            res.status(200).json(response)
        }
        else {
            await biography.save((err) => {
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
                        "message": "Biography Added SuccessFully"
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
//controller to get all the biographies
biographyController.get = async (req, res) => {
    try {
        const biographys = await Biography.find({ is_deleted: false })
            let response = {
                "status": 200,
                "message": "Biography Details",
                "data": biographys
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


//controller for deleting an biography
biographyController.delete = async (req, res) => {
    try {
        const biographyId = mongoose.Types.ObjectId(req.params.id)
        const biography = await Biography.find({ _id: biographyId, is_deleted: false })
        if (biography.length != 1) {
            let response = {
                "status": 404,
                "message": "Booking Not Found",
            }
            res.status(404).json(response)
        }
        else {
            biography[0].set({ is_deleted: true })
            let updatedBooking = await biography[0].save();
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

module.exports = biographyController