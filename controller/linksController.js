const instaController = {}
const drakeController = {}
const supportController = {}
const mongoose = require('mongoose')
const { InstaLink,DrakeLink,SupportLink } = require('../model/linksModel')


instaController.add = async (req, res) => {
    try {
        link = await InstaLink.find({is_deleted:false})

        if (link.length == 0) {
            instalink = await InstaLink.create({
                link: req.body.link,
            })


            res.status(200).send({
                "status": 200,
                "message": "Link Added",
                "data": [instalink]
            }
            )
        }
        else {

            await link[0].set({ link: req.body.link })
            link[0].save()

            res.status(200).send({
                "status": 200,
                "message": "Link Updated.",
                "data": instalink,
            }
            )
        }
    }
    catch (err) {
        console.log(err)
    }
}
instaController.get = async (req, res) => {
    try {
        const link = await InstaLink.find({ is_deleted: false })
        let response = {
            "status": 200,
            "message": "Available Instagram Link",
            "data": link
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


instaController.delete = async (req, res) => {
    try {
        const link = await InstaLink.find({ is_deleted: false })
        if (link.length != 1) {
            let response = {
                "status": 404,
                "message": "Link Not Found",
            }
            res.status(404).json(response)
        }
        else {
            link[0].set({ is_deleted: true })
            let updatedLink = await link[0].save();
            let response = {
                "status": 200,
                "message": "Link Deleted Successfully",
                "data": [updatedLink]
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
drakeController.add = async (req, res) => {
    try {
        link = await DrakeLink.find({is_deleted:false})

        if (link.length == 0) {
            drakelink = await DrakeLink.create({
                link: req.body.link,
            })


            res.status(200).send({
                "status": 200,
                "message": "Link Added",
                "data": [drakelink]
            }
            )
        }
        else {

            await link[0].set({ link: req.body.link })
            link[0].save()

            res.status(200).send({
                "status": 200,
                "message": "Link Updated",
                "data": link,
            }
            )
        }
    }
    catch (err) {
        console.log(err)
    }
}
drakeController.get = async (req, res) => {
    try {
        const link = await DrakeLink.find({ is_deleted: false })
        let response = {
            "status": 200,
            "message": "Available DJ Drake Link",
            "data": link
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


drakeController.delete = async (req, res) => {
    try {
        const link = await DrakeLink.find({ is_deleted: false })
        if (link.length != 1) {
            let response = {
                "status": 404,
                "message": "Link Not Found",
            }
            res.status(404).json(response)
        }
        else {
            link[0].set({ is_deleted: true })
            let updatedLink = await link[0].save();
            let response = {
                "status": 200,
                "message": "Link Deleted Successfully",
                "data": [updatedLink]
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

supportController.add = async (req, res) => {
    try {
        link = await SupportLink.find({is_deleted:false})

        if (link.length == 0) {
            supportlink = await SupportLink.create({
                link: req.body.link,
            })


            res.status(200).send({
                "status": 200,
                "message": "Link Added",
                "data": [supportlink]
            }
            )
        }
        else {

            await link[0].set({ link: req.body.link })
            link[0].save()

            res.status(200).send({
                "status": 200,
                "message": "Link Updated",
                "data": link,
            }
            )
        }
    }
    catch (err) {
        console.log(err)
    }
}
supportController.get = async (req, res) => {
    try {
        const link = await SupportLink.find({ is_deleted: false })
        let response = {
            "status": 200,
            "message": "Support Details",
            "data": link
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


supportController.delete = async (req, res) => {
    try {
        const link = await SupportLink.find({ is_deleted: false })
        if (link.length != 1) {
            let response = {
                "status": 404,
                "message": "Link Not Found",
            }
            res.status(404).json(response)
        }
        else {
            link[0].set({ is_deleted: true })
            let updatedLink = await link[0].save();
            let response = {
                "status": 200,
                "message": "Link Deleted Successfully",
                "data": [updatedLink]
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

module.exports = { instaController, drakeController, supportController }
