const subcategoryController = {}
const mongoose = require('mongoose')
const {SubCategory } = require('../model/categoryModel')
//controller to add data in category
subcategoryController.add = async (req, res) => {
    try {
        const item = new SubCategory(req.body)
        const itemIn = await SubCategory.find({
            menu_id: item.menu_id,
            category_id: item.category_id,
            sub_category_name: item.sub_category_name,
            sub_category_for: item.sub_category_for,
            is_deleted: false
        })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Item Exists"
            }
            res.status(400).json(response)
        }
        else if (!item.sub_category_name || !item.category_id|| !item.menu_id || !item.sub_category_for) {
            let response = {
                "status": 400,
                "message": "Please Enter The category Id, Sub Category Name, Sub Category For"
            }
            res.status(400).json(response)
        }
        else {
            let AllItems = await SubCategory.find({ is_deleted: false }).sort({ position: 1 })

            if (AllItems.length == 0) {
                item.position = 1
            }
            else {
                AllItems.forEach(item => {

                    item.position += 1
                    item.save()
                })
            }
            item.position=1
            item.sub_category_for = req.body.sub_category_for.toLowerCase()
            console.log(item.sub_category_for)
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

subcategoryController.getAll = async (req, res) => {
    try {
        const itemsIn = await SubCategory.find({ is_deleted: false })
        if (itemsIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Sub Categories",
                "data": itemsIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No Sub Category Available"
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

subcategoryController.updateCategory = async (req, res) => {
    try {
        const sub_categoryId = mongoose.Types.ObjectId(req.params.id)
        const category = await SubCategory.find({ _id: sub_categoryId, is_deleted: false })
        if (category.length != 1) {
            let response = {
                "status": 404,
                "message": "Sub Category Not Found",
            }
            res.status(404).json(response)
        }
        else {
            category[0].set(req.body)
            let updatedCategory = await category[0].save();
            let response = {
                "status": 200,
                "message": "Sub Category Updated Successfully",
                "Updated Sub Category": updatedCategory
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
subcategoryController.delete = async (req, res) => {
    try {
        const sub_categoryId = mongoose.Types.ObjectId(req.params.id)
        const category = await SubCategory.find({ _id: sub_categoryId, is_deleted: false })
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
                "message": "Sub Category Deleted Successfully",
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

module.exports = subcategoryController
