const favController = {}
const mongoose = require('mongoose')
const { Fav } = require('../model/favModel')
const { Songs } = require('../model/songModel')
const { PlaylistSongs } = require('../model/playlistSongsModel')

favController.fav = async (req, res) => {
    try {
        let fav = new Fav(req.body)
        fav.user_id = req.user.id
        if (!fav.user_id || !fav.menu_id || !fav.song_id) {
            let response = {
                "status": 400,
                "message": "Please Enter User Id, Menu Id, Song Id"
            }
            res.status(400).json(response)
        }
        else {
            let clicked = await Fav.find({ user_id: fav.user_id, menu_id: fav.menu_id, song_id: fav.song_id, is_deleted: false })

            if (clicked.length > 0) {
                clicked[0].set({ is_deleted: true })
                let updatedClick = await clicked[0].save();
                if (updatedClick) {
                    let song = await Songs.findOne({ menu_id: fav.menu_id, _id: fav.song_id, is_deleted: false })
                    song.favourites_count -= 1
                    await song.save((err) => {
                        if (err) {
                            song.favourites_count += 1
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
                        "message": "Song Removed From Favorite",
                        "data": [song]
                    }
                    res.status(200).json(response)
                }
            }

            else {
                let song = await Songs.findOne({ menu_id: fav.menu_id, _id: fav.song_id, is_deleted: false })
                song.favourites_count += 1
                await song.save((err) => {
                    if (err) {
                        song.favourites_count -= 1
                        song.save()
                        let response = {
                            "status": 400,
                            "message": "Error In Saving Data",
                            "Error": [err]
                        }
                        res.status(400).json(response)
                    }
                })
                await fav.save((err) => {
                    if (err) {
                        let response = {
                            "status": 400,
                            "message": "Error In Saving Data",
                            "Error": [err]
                        }
                        res.status(400).json(response)
                        song.save(async (err) => {
                            if (err) {
                                song.favourites_count -= 1
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
                            "message": "Song Added To Favourite",
                            "data": [song]
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
favController.get = async (req, res) => {
    try {
        const fav = await Fav.find({ user_id: req.user.id, is_deleted: false })
        // const songId=fav[0].song_id
        const songs = await Songs.find({ is_deleted: false }).populate()
        const playlist = await PlaylistSongs.find({ user_id: req.user.id, is_deleted: false }).populate()
        const final=[]
        fav.forEach((favo) => {
            songs.forEach((song) => {
                playlist.forEach((play) => {
                    if (favo.song_id.toString() == song._id.toString() || song._id.toString() == play.song_id.toString()) {
                    const ans={...favo._doc,...song._doc,...play._doc}
                    final.push(ans)
                }
                })
            })
        })
        let response = {
            "status": 200,
            "message": "Favourite Songs Listing",
            "data": final
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

module.exports = favController
