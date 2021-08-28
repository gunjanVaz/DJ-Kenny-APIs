const likesController = {}
const mongoose = require('mongoose')
const { Likes, VidLikes } = require('../model/likesModel')
const { Songs } = require('../model/songModel')
const { Videos } = require('../model/videoModel')

likesController.like = async (req, res) => {
    try {
        let like = new Likes(req.body)
        like.user_id = req.user.id
        if (!like.user_id || !like.song_id) {
            let response = {
                "status": 400,
                "message": "Please Enter User Id, Menu Id, Song Id"
            }
            res.status(400).json(response)
        }
        else {
            let clicked = await Likes.find({ user_id: like.user_id, song_id: like.song_id, is_deleted: false })

            if (clicked.length > 0) {
                clicked[0].set({ is_deleted: true })
                let updatedClick = await clicked[0].save();
                if (updatedClick) {
                    let song = await Songs.findOne({ _id: like.song_id, is_deleted: false })
                    song.likes_count -= 1
                    song.likes_status = 0
                    await song.save((err) => {
                        if (err) {
                            song.likes_count += 1
                            song.save()
                            let response = {
                                "status": 400,
                                "message": "Error In Saving Data",
                                "Error": [err]
                            }
                            res.status(400).json(response)
                        }
                    })
                    let response = {
                        "status": 200,
                        "message": "Unliked"
                    }
                    res.status(200).json(response)
                }
            }

            else {
                let song = await Songs.findOne({ _id: like.song_id, is_deleted: false })
                like.menu_id = song.menu_id
                song.likes_count += 1
                song.likes_status = 1
                await song.save((err) => {
                    if (err) {
                        song.likes_count -= 1
                        song.save()
                        let response = {
                            "status": 400,
                            "message": "Error In Saving Data",
                            "Error": [err]
                        }
                        res.status(400).json(response)
                    }
                })
                await like.save((err) => {
                    if (err) {
                        let response = {
                            "status": 400,
                            "message": "Error In Saving Data",
                            "Error": [err]
                        }
                        res.status(400).json(response)
                        song.save(async (err) => {
                            if (err) {
                                song.likes_count -= 1
                                song.save()
                                let response = {
                                    "status": 400,
                                    "message": "Error In Saving Data",
                                    "Error": [err]
                                }
                                res.status(400).json(response)
                            }
                        })
                    }
                    else {
                        let response = {
                            "status": 200,
                            "message": "Liked"
                        }
                        res.status(200).json(response)
                    }
                })
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

likesController.vidlike = async (req, res) => {
    try {
        let like = new VidLikes(req.body)
        like.user_id = req.user.id

        if (!like.user_id || !like.video_id) {
            let response = {
                "status": 400,
                "message": "Please Enter User Id, Menu Id, Video Id"
            }
            res.status(400).json(response)
        }
        else {
            let clicked = await VidLikes.find({ user_id: like.user_id, video_id: like.video_id, is_deleted: false })

            if (clicked.length > 0) {
                clicked[0].set({ is_deleted: true })
                let updatedClick = await clicked[0].save();
                if (updatedClick) {
                    let video = await Videos.findOne({ _id: like.video_id, is_deleted: false })
                    like.menu_id = video.menu_id
                    video.likes_count -= 1
                    video.likes_status = 0
                    await video.save((err) => {
                        if (err) {
                            video.likes_count += 1
                            video.save()
                            let response = {
                                "status": 400,
                                "message": "Error In Saving Data",
                                "Error": [err]
                            }
                            res.status(400).json(response)
                        }
                    })
                    let response = {
                        "status": 200,
                        "message": "You Unliked This Video",
                        "likes_status": video.likes_status,
                        "likes_count": video.likes_count
                    }
                    res.status(200).json(response)
                }
            }

            else {
                let video = await Videos.findOne({ _id: like.video_id, is_deleted: false })
                video.likes_count += 1
                video.likes_status = 1
                await video.save((err) => {
                    if (err) {
                        video.likes_count -= 1
                        video.save()
                        let response = {
                            "status": 400,
                            "message": "Error In Saving Data",
                            "Error": [err]
                        }
                        res.status(400).json(response)
                    }
                })
                await like.save((err) => {
                    if (err) {
                        let response = {
                            "status": 400,
                            "message": "Error In Saving Data",
                            "Error": [err]
                        }
                        res.status(400).json(response)
                        video.save(async (err) => {
                            if (err) {
                                video.likes_count -= 1
                                video.save()
                                let response = {
                                    "status": 400,
                                    "message": "Error In Saving Data",
                                    "Error": [err]
                                }
                                res.status(400).json(response)
                            }
                        })
                    }
                    else {
                        let response = {
                            "status": 200,
                            "message": "You Liked The Video",
                            "likes_status": video.likes_status,
                            "likes_count": video.likes_count
                        }
                        res.status(200).json(response)
                    }
                })
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

module.exports = likesController
