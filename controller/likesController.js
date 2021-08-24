const likesController = {}
const mongoose = require('mongoose')
const { Likes } = require('../model/likesModel')
const { Songs } = require('../model/songModel')

likesController.like = async (req, res) => {
    try {
        let like = new Likes(req.body)
        like.user_id = req.user.id,
            console.log(req.user)
        if (!like.user_id || !like.menu_id || !like.song_id) {
            let response = {
                "status": 400,
                "message": "Please Enter User Id, Menu Id, Song Id"
            }
            res.status(400).json(response)
        }
        else {
            let clicked = await Likes.find({ user_id: like.user_id, menu_id: like.menu_id, song_id: like.song_id, is_deleted: false })

            if (clicked.length > 0) {
                clicked[0].set({ is_deleted: true })
                let updatedClick = await clicked[0].save();
                if (updatedClick) {
                    let song = await Songs.findOne({ menu_id: like.menu_id, _id: like.song_id, is_deleted: false })
                    song.likes_count -= 1
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
                let song = await Songs.findOne({ menu_id: like.menu_id, _id: like.song_id, is_deleted: false })
                song.likes_count += 1
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

module.exports = likesController
