const categoryController = {}
const mongoose = require('mongoose')
const { Category, CategoryItems, SubCategory } = require('../model/categoryModel')
const { Videos } = require('../model/videoModel')
const { Songs } = require('../model/songModel')
//controller to add an data in category
categoryController.add = async (req, res) => {
    try {
        const item = new Category(req.body)
        const itemIn = await Category.find({
            menu_id: item.menu_id,
            category_name: item.category_name,
            category_for: item.category_for,
            is_deleted: false
        })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Item Exists"
            }
            res.status(400).json(response)
        }
        else if (!item.menu_id || !item.category_name || !item.category_for) {
            let response = {
                "status": 400,
                "message": "Please Enter The menu id, category name, category for"
            }
            res.status(400).json(response)
        }
        else {
            item.category_for = req.body.category_for.toLowerCase()
            let AllItems = await Category.find({ is_deleted: false }).sort({ position: 1 })
            console.log(AllItems)

            if (AllItems.length == 0) {
                item.position = 1
            }
            else {
                AllItems.forEach(it => {

                    it.position += 1
                    console.log(it.position)
                    it.save()
                })
            }
            item.position=1
            console.log(item)
            await item.save((err) => {
                if (err) {
                    AllItems.forEach(it => {

                        it.position -= 1
                        console.log(it.position)
                        it.save()
                    })
                    let response = {
                        "status": 500,
                        "message": "Error In Saving Data",
                        "Error": [err.message]
                    }
                    res.status(500).json(response)
                }
                else {
                    let response = {
                        "status": 200,
                        "message": "Item Saved Successfully",
                        data: item
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

categoryController.getAll = async (req, res) => {
    try {
        const itemsIn = await Category.find({ is_deleted: false })
        if (itemsIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Categories",
                "data": itemsIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No category Available"
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

categoryController.updateCategory = async (req, res) => {
    try {
        const categoryId = mongoose.Types.ObjectId(req.params.id)
        const category = await Category.find({ _id: categoryId, is_deleted: false })
        if (category.length != 1) {
            let response = {
                "status": 404,
                "message": "Category Not Found",
            }
            res.status(404).json(response)
        }
        else {
            category[0].set(req.body)
            let updatedCategory = await category[0].save();
            let response = {
                "status": 200,
                "message": "Category Updated Successfully",
                "Updated Category": updatedCategory
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
categoryController.delete = async (req, res) => {
    try {
        const categoryId = mongoose.Types.ObjectId(req.params.id)
        const category = await Category.find({ _id: categoryId, is_deleted: false })
        if (category.length != 1) {
            let response = {
                "status": 404,
                "message": "Category Not Found",
            }
            res.status(404).json(response)
        }
        else {
            category[0].set({ is_deleted: true })
            let updatedCategory = await category[0].save();
            let response = {
                "status": 200,
                "message": "Category Deleted Successfully",
                "data": updatedCategory
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


module.exports = categoryController
