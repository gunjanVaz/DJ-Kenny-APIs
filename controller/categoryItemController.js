const categoryItemController = {}
const mongoose = require('mongoose')
const { CategoryItems } = require('../model/categoryModel')

//controller to add an data in category
categoryItemController.add = async (req, res) => {
    try {
        const item = new CategoryItems(req.body)
        const itemIn = await CategoryItems.find({
            menu_id: item.menu_id,
            category_id: item.category_id,
            sub_category_id: item.sub_category_id,
            song_id: item.song_id,
            video_id: item.video_id,
            radio_id: item.radio_id,
            is_deleted: false
        })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Item Exists"
            }
            res.status(400).json(response)
        }
        else {
            let AllItems = await CategoryItems.find({ is_deleted: false }).sort({ position: 1 })
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
                        "message": "Category Item Saved Successfully",
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

categoryItemController.getAll = async (req, res) => {
    try {
        const itemsIn = await CategoryItems.find({ is_deleted: false })
        if (itemsIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Category Items",
                "data": itemsIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No Category Item Available"
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

categoryItemController.update = async (req, res) => {
    try {
        const categoryItemId = mongoose.Types.ObjectId(req.params.id)
        const categoryItem = await CategoryItems.find({ _id: categoryItemId, is_deleted: false })
        if (categoryItem.length != 1) {
            let response = {
                "status": 404,
                "message": "Category Item Not Found",
            }
            res.status(404).json(response)
        }
        else {
            categoryItem[0].set(req.body)
            let updatedCategoryItem = await categoryItem[0].save();
            let response = {
                "status": 200,
                "message": "Category Item Updated Successfully",
                "Updated Category Item": updatedCategoryItem
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
categoryItemController.delete = async (req, res) => {
    try {
        const categoryItemId = mongoose.Types.ObjectId(req.params.id)
        const categoryItem = await CategoryItems.find({ _id: categoryItemId, is_deleted: false })
        if (categoryItem.length != 1) {
            let response = {
                "status": 404,
                "message": "Category Item Not Found",
            }
            res.status(404).json(response)
        }
        else {
            categoryItem[0].set({ is_deleted: true })
            let updatedCategoryItems = await categoryItem[0].save();
            let response = {
                "status": 200,
                "message": "Category Item Deleted Successfully",
                "data": updatedCategoryItems
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
// controller to get videos category and tracks category response
categoryItemController.get = async (req, res) => {
    try {
        const menu_id = req.query.menu_id;
        const menu_type = req.query.menu_type;
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        if (menu_type.toLowerCase() === 'videoscategory') {
            const items = await CategoryItemsItems.find({ category_for: 'videos', menu_id: menu_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Videos CategoryItemsItems",
                    "data": resultItems,
                    "per_page": limit,
                    "current_page": page,
                    "last_page": Math.ceil(resultItems.length / limit)
                }
                res.status(200).json(response)
            }
            else {
                let response = {
                    "status": 200,
                    "message": "Available Items",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else if (menu_type.toLowerCase() === 'trackscategory') {
            const items = await CategoryItemsItems.find({ category_for: 'tracks', menu_id: menu_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Tracks CategoryItemsItems",
                    "data": resultItems,
                    "per_page": limit,
                    "current_page": page,
                    "last_page": Math.ceil(resultItems.length / limit)
                }
                res.status(200).json(response)
            }
            else {
                let response = {
                    "status": 200,
                    "message": "Available Items",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else {
            let response = {
                "status": 404,
                "message": "No Such CategoryItemsItems Available"
            }
            res.status(400).json(response)
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

module.exports = categoryItemController
