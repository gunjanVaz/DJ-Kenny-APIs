const radioController = {}
const mongoose = require('mongoose')
const { Radio } = require('../model/radioModel')
//controller to add data in category
radioController.add = async (req, res) => {
    try {
        const radio = new Radio(req.body)
        const radioIn = await Radio.find({
            radio_name: radio.radio_name,
            radio_link: radio.radio_link,
            is_deleted: false
        })
        if (radioIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Radio Exists"
            }
            res.status(400).json(response)
        }
        else if (!radio.radio_name || !radio.radio_link) {
            let response = {
                "status": 400,
                "message": "Please Enter Name And Link Of The Radio"
            }
            res.status(400).json(response)
        }
        else {
            let AllRadio = await Radio.find({ is_deleted: false }).sort({ position: 1 })

            if (AllRadio.length == 0) {
                radio.position = 1
            }
            else {
                AllRadio.forEach(radio => {
                    radio.position += 1
                    radio.save()
                })
            }
            radio.position = 1
            await radio.save((err) => {
                if (err) {
                    AllRadio.forEach(radio => {
                        radio.position -= 1
                        radio.save()
                    })

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
                        "message": "Radio Saved Successfully",
                        data: radio
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

radioController.getAll = async (req, res) => {
    try {
        const radiosIn = await Radio.find({ is_deleted: false })
        if (radiosIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Radio",
                "data": radiosIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No Radio Available"
            }
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

radioController.update = async (req, res) => {
    try {
        const radioId = mongoose.Types.ObjectId(req.params.id)
        const radio = await Radio.find({ _id: radioId, is_deleted: false })
        if (radio.length != 1) {
            let response = {
                "status": 404,
                "message": "Radio Not Found",
            }
            res.status(404).json(response)
        }
        else {
            radio[0].set(req.body)
            let updatedRadio = await radio[0].save();
            let response = {
                "status": 200,
                "message": "Radio Updated Successfully",
                "Updated Radio": updatedRadio
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
radioController.delete = async (req, res) => {
    try {
        const radioId = mongoose.Types.ObjectId(req.params.id)
        const radio = await Radio.find({ _id: radioId, is_deleted: false })
        if (radio.length != 1) {
            let response = {
                "status": 404,
                "message": "Radio Not Found",
            }
            res.status(404).json(response)
        }
        else {
            radio[0].set({ is_deleted: true })
            let updatedRadio = await radio[0].save();
            let response = {
                "status": 200,
                "message": "Radio Deleted Successfully",
                "data": updatedRadio
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

module.exports = radioController
