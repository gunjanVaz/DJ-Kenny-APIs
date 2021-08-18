const galleryController = {}
const mongoose = require('mongoose')
const { Gallery } = require('../model/galleryModel')

//controller to add an image
galleryController.addImage = async (req, res) => {
    try {
        const image = new Gallery(req.body)
        const imageIn = await Gallery.find({ image: image.image, is_deleted: false })
        if (imageIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Image Exists"
            }
            res.status(400).json(response)
        }
        else if (!image.image) {
            let response = {
                "status": 400,
                "message": "Please Enter The Image URL"
            }
            res.status(400).json(response)
        }
        else {
            await image.save((err) => {
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
                        "message": "Image Saved Successfully"
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
galleryController.getImage = async (req, res) => {
    try {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const gallery = await Gallery.find({ is_deleted: false })
        console.log(gallery)
        if (page && limit) {
            let startIndex = (page - 1) * limit
            let endIndex = page * limit

            const resultImages = gallery.slice(startIndex, endIndex)

            let response = {
                "status": 200,
                "message": "Success",
                "data": resultImages,
                "per_page": limit,
                "current_page": page,
                "last_page": Math.ceil(resultImages.length / limit)
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 200,
                "message": "Available Gallery Images",
                "data": gallery
            }
            res.status(200).json(response)
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
//controller for updating an image
galleryController.updateImage = async (req, res) => {
    try {
        const imageId = mongoose.Types.ObjectId(req.params.id)
        const image = await Gallery.find({ _id: imageId, is_deleted: false })
        if (image.length != 1) {
            let response = {
                "status": 404,
                "message": "Image Not Found",
            }
            res.status(404).json(response)
        }
        else {
            image[0].set(req.body)
            let updatedImage = await image[0].save();
            let response = {
                "status": 200,
                "message": "Image Updated Successfully",
                "Updated Image": [
                    {
                        "image": updatedImage.image,
                        "status": updatedImage.image_status,
                    }
                ]
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
galleryController.deleteImage = async (req, res) => {
    try {
        const imageId = mongoose.Types.ObjectId(req.params.id)
        const image = await Gallery.find({ _id: imageId, is_deleted: false })
        if (image.length != 1) {
            let response = {
                "status": 404,
                "message": "Image Not Found",
            }
            res.status(404).json(response)
        }
        else {
            image[0].set({ is_deleted: true })
            let updatedImage = await image[0].save();
            let response = {
                "status": 200,
                "message": "Image Deleted Successfully",
                "data": updatedImage
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
module.exports = galleryController
