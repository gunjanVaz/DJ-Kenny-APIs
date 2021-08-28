const sponsorSliderController = {}
const bannerSliderController = {}
const mongoose = require('mongoose')
const { Sponsor, Banner } = require('../model/sliderModel')

sponsorSliderController.add = async (req, res) => {
    try {
        const item = new Sponsor(req.body)
        const itemIn = await Sponsor.find({
            image: item.image,
            link: item.link,
            is_deleted: false
        })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Sponsor Already Added To The Banner Slider"
            }
            res.status(400).json(response)
        }
        else {
            await item.save((err) => {

                if (err) {
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
                        "message": "Sponsor Added to The Slider Successfully",
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

sponsorSliderController.getAll = async (req, res) => {
    try {
        const itemsIn = await Sponsor.find({ is_deleted: false })
        if (itemsIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Sponsors",
                "data": itemsIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No Sponsor Available"
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

sponsorSliderController.update = async (req, res) => {
    try {
        const sponsorId = mongoose.Types.ObjectId(req.params.id)
        const sponsorItem = await Sponsor.find({ _id: sponsorId, is_deleted: false })
        if (sponsorItem.length != 1) {
            let response = {
                "status": 404,
                "message": "Sponsor Not Found",
            }
            res.status(404).json(response)
        }
        else {
            sponsorItem[0].set(req.body)
            let updatedSponsorItem = await sponsorItem[0].save();
            let response = {
                "status": 200,
                "message": "Sponsor Details Updated Successfully",
                "Updated Sponsor Details": updatedSponsorItem
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
sponsorSliderController.delete = async (req, res) => {
    try {
        const sponsorId = mongoose.Types.ObjectId(req.params.id)
        const sponsorItem = await Sponsor.find({ _id: sponsorId, is_deleted: false })
        if (sponsorItem.length != 1) {
            let response = {
                "status": 404,
                "message": "Sponsor Not Found",
            }
            res.status(404).json(response)
        }
        else {
            sponsorItem[0].set({ is_deleted: true })
            let updatedSponsor = await sponsorItem[0].save();
            let response = {
                "status": 200,
                "message": "Sponsor Removed Successfully",
                "data": updatedSponsor
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
sponsorSliderController.getOne = async (req, res) => {
    try {
        const items = await Sponsor.find({ _id: req.params.id, is_deleted: false })
        if (items.length == 1) {
            let response = {
                "status": 200,
                "message": "Sponsor Details",
                "data": items
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 404,
                "message": "No Such Sponsor Available"
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
//
bannerSliderController.add = async (req, res) => {
    try {
        const item = new Banner(req.body)
        const itemIn = await Banner.find({
            image: item.image,
            link: item.link,
            is_deleted: false
        })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Banner Already Added To The Banner Slider"
            }
            res.status(400).json(response)
        }
        else {
            await item.save((err) => {

                if (err) {
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
                        "message": "Banner Added to The Slider Successfully",
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

bannerSliderController.getAll = async (req, res) => {
    try {
        const itemsIn = await Banner.find({ is_deleted: false })
        if (itemsIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Banners",
                "data": itemsIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No Banners Available"
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

bannerSliderController.update = async (req, res) => {
    try {
        const bannerId = mongoose.Types.ObjectId(req.params.id)
        const bannerItem = await Banner.find({ _id: bannerId, is_deleted: false })
        if (bannerItem.length != 1) {
            let response = {
                "status": 404,
                "message": "Banner Not Found",
            }
            res.status(404).json(response)
        }
        else {
            bannerItem[0].set(req.body)
            let updatedBannerItem = await bannerItem[0].save();
            let response = {
                "status": 200,
                "message": "Banner Details Updated Successfully",
                "Updated Banner Details": updatedBannerItem
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
bannerSliderController.delete = async (req, res) => {
    try {
        const bannerId = mongoose.Types.ObjectId(req.params.id)
        const bannerItem = await Banner.find({ _id: bannerId, is_deleted: false })
        console.log(bannerItem)
        if (bannerItem.length > 1) {
            let response = {
                "status": 404,
                "message": "Banner Not Found",
            }
            res.status(404).json(response)
        }
        else {
            bannerItem[0].set({ is_deleted: true })
            let updatedBanner = await bannerItem[0].save();
            let response = {
                "status": 200,
                "message": "Banner Removed Successfully",
                "data": updatedBanner
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
bannerSliderController.getOne = async (req, res) => {
    try {
        const items = await Banner.find({ _id: req.params.id, is_deleted: false })
        if (items.length == 1) {
            let response = {
                "status": 200,
                "message": "Banner Details",
                "data": items
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 404,
                "message": "No Such Banner Available"
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
module.exports = { sponsorSliderController, bannerSliderController }
