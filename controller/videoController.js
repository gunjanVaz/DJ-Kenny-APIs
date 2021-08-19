const videoController = {}
const mongoose = require('mongoose')
const {Videos } = require('../model/videoModel')
//controller to add data in category
videoController.add = async (req, res) => {
    try {
        const video = new Videos(req.body)
        const videoIn = await Videos.find({
            video_name: item.video_name,
            video_link: item.video_link,
            is_deleted: false
        })
        if (videoIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Item Exists"
            }
            res.status(400).json(response)
        }
        else if (!video.video_name || !video.video_link) {
            let response = {
                "status": 400,
                "message": "Please Enter Name And Link Of The Video"
            }
            res.status(400).json(response)
        }
        else {
            let AllVideos = await Videos.find({ is_deleted: false }).sort({ position: 1 })

            if (AllVideos.length == 0) {
                video.position = 1
            }
            else {
                AllVideos.forEach(video => {

                    video.position += 1
                    video.save()
                })
            }
            video.position=1
            await video.save((err) => {
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
                        "message": "Video Saved Successfully",
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

videoController.getAll = async (req, res) => {
    try {
        const videosIn = await Videos.find({ is_deleted: false })
        if (videosIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Videos",
                "data": videosIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No Video Available"
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

videoController.update = async (req, res) => {
    try {
        const videoId = mongoose.Types.ObjectId(req.params.id)
        const video = await Videos.find({ _id: videoId, is_deleted: false })
        if (videos.length != 1) {
            let response = {
                "status": 404,
                "message": "Video Not Found",
            }
            res.status(404).json(response)
        }
        else {
            video[0].set(req.body)
            let updatedVideo = await video[0].save();
            let response = {
                "status": 200,
                "message": "Video Updated Successfully",
                "Updated Video": updatedVideo
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
videoController.delete = async (req, res) => {
    try {
        const videoId = mongoose.Types.ObjectId(req.params.id)
        const video = await Videos.find({ _id: videoId, is_deleted: false })
        if (video.length != 1) {
            let response = {
                "status": 404,
                "message": "Video Not Found",
            }
            res.status(404).json(response)
        }
        else {
            video[0].set({ is_deleted: true })
            let updatedVideo = await video[0].save();
            let response = {
                "status": 200,
                "message": "Video Deleted Successfully",
                "data": updatedVideo
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

module.exports = videoController
