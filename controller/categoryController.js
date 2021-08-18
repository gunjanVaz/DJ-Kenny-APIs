const categoryController = {}
const mongoose = require('mongoose')
const { Category, CategoryItems, SubCategory } = require('../model/categoryModel')
const {Videos}=require('../model/videoModel')
const {Songs}=require('../model/songModel')
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
            console.log(item.category_for)
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
// controller to get videos category and tracks category response
categoryController.get = async (req, res) => {
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
                    "message": "Available Items",
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
                    "message": "Available Items",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else {
            let response = {
                "status": 404,
                "message": "No Such Category Available"
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
// //controller for updating an image
// galleryController.updateImage = async (req, res) => {
//     try {
//         const imageId = mongoose.Types.ObjectId(req.params.id)
//         const image = await Gallery.find({ _id: imageId, is_deleted: false })
//         if (image.length != 1) {
//             let response = {
//                 "status": 404,
//                 "message": "Image Not Found",
//             }
//             res.status(404).json(response)
//         }
//         else {
//             image[0].set(req.body)
//             let updatedImage = await image[0].save();
//             let response = {
//                 "status": 200,
//                 "message": "Image Updated Successfully",
//                 "Updated Image": [
//                     {
//                         "image": updatedImage.image,
//                         "status": updatedImage.image_status,
//                     }
//                 ]
//             }
//             res.status(200).json(response)
//         }
//     }
//     catch (err) {
//         console.log(err);
//         if (err.errors) {
//             let errors = [];
//             Object.entries(err.errors).forEach(([key, value]) => {
//                 if (value.name) {
//                     errors.push({
//                         name: key,
//                         message: value.message
//                     });
//                 }
//             });
//             return res.status(400).send(errors);
//         } else {
//             console.log(err)
//             let response = {
//                 "status": 500,
//                 "message": "Internal Server Error",
//                 "Error": [err.message]
//             }
//             res.status(500).json(response)
//         }
//     }
// }

// //controller for deleting an image
// galleryController.deleteImage = async (req, res) => {
//     try {
//         const imageId = mongoose.Types.ObjectId(req.params.id)
//         const image = await Gallery.find({ _id: imageId, is_deleted: false })
//         if (image.length != 1) {
//             let response = {
//                 "status": 404,
//                 "message": "Image Not Found",
//             }
//             res.status(404).json(response)
//         }
//         else {
//             image[0].set({ is_deleted: true })
//             let updatedImage = await image[0].save();
//             let response = {
//                 "status": 200,
//                 "message": "Image Deleted Successfully",
//                 "data": updatedImage
//             }
//             res.status(200).json(response)
//         }
//     }
//     catch (err) {
//         console.log(err);
//         if (err.errors) {
//             let errors = [];
//             Object.entries(err.errors).forEach(([key, value]) => {
//                 if (value.name) {
//                     errors.push({
//                         name: key,
//                         message: value.message
//                     });
//                 }
//             });
//             return res.status(400).send(errors);
//         } else {
//             console.log(err)
//             let response = {
//                 "status": 500,
//                 "message": "Internal Server Error",
//                 "Error": [err.message]
//             }
//             res.status(500).json(response)
//         }
//     }
// }
module.exports = categoryController
