const menuItemsController = {}
const mongoose = require('mongoose')
const { Category, CategoryItems, SubCategory } = require('../model/categoryModel')
const { Videos } = require('../model/videoModel')
const { Songs } = require('../model/songModel')
const { Radio } = require('../model/radioModel')
// controller to get videos category and tracks category response
menuItemsController.get = async (req, res) => {
    try {
        const menu_id = req.query.menu_id;
        const menu_type = req.query.menu_type;
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        if (menu_type.toLowerCase() === 'videoscategory') {
            const items = await Category.find({ category_for: 'videos', menu_id: menu_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Videos Category",
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
                    "message": "Available Videos Category",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else if (menu_type.toLowerCase() === 'trackscategory') {
            const items = await Category.find({ category_for: 'tracks', menu_id: menu_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Tracks Category",
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
                    "message": "Available Tracks Category",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else if (menu_type.toLowerCase() === 'videos') {
            const items = await Videos.find({ menu_id: menu_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Videos",
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
                    "message": "Available Videos",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else if (menu_type.toLowerCase() === 'tracks') {
            const items = await Songs.find({menu_id: menu_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Tracks",
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
                    "message": "Available Tracks",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else if (menu_type.toLowerCase() === 'radio') {
            console.log(menu_id,menu_type,page,limit)
            const items = await Radio.find({menu_id: menu_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Radios",
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
                    "message": "Available Radios",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else {
            let response = {
                "status": 404,
                "message": "No Such Menu Item Available"
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

module.exports=menuItemsController