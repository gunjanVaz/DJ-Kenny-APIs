const menuController = {}
const mongoose = require('mongoose')
const { Menu } = require('../model/menuModel')

//controller to add an item
menuController.addItem = async (req, res) => {
    try {
        const item = new Menu(req.body)
        const itemIn = await Menu.find({ menu_image: item.menu_image, menu_name: item.menu_name, menu_type: item.menu_type, is_deleted: false })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Item Exists"
            }
            res.status(400).json(response)
        }
        else if (!item.menu_image || !item.menu_name || !item.menu_type) {
            let response = {
                "status": 400,
                "message": "Please Enter The Image, Name and Type of the Menu Item"
            }
            res.status(400).json(response)
        }
        else {
            await item.save((err) => {
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
                        "message": "Menu Item Saved Successfully"
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

//controller to get all the images
menuController.getItem = async (req, res) => {
    try {
        const item = await Menu.find({ is_deleted: false })
        let response = {
            "status": 200,
            "message": "Success",
            "data": item
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

//controller for updating an image
menuController.updateItem = async (req, res) => {
    try {
        const itemId = mongoose.Types.ObjectId(req.params.id)
        const item = await Menu.find({ _id: itemId, is_deleted: false })
        if (item.length != 1) {
            let response = {
                "status": 404,
                "message": "Item Not Found",
            }
            res.status(404).json(response)
        }
        else {
            item[0].set(req.body)
            let updatedItem = await item[0].save();
            let response = {
                "status": 200,
                "message": "Menu Item Updated Successfully",
                "data": updatedItem
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
menuController.deleteItem = async (req, res) => {
    try {
        const itemId = mongoose.Types.ObjectId(req.params.id)
        const item = await Menu.find({ _id: itemId, is_deleted: false })
        if (item.length != 1) {
            let response = {
                "status": 404,
                "message": "Item Not Found",
            }
            res.status(404).json(response)
        }
        else {
            item[0].set({ is_deleted: true })
            let updatedItem = await item[0].save();
            let response = {
                "status": 200,
                "message": "Item Deleted Successfully",
                "data": updatedItem
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
module.exports = menuController
