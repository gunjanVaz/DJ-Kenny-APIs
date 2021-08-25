const playlistSongsController = {}
const mongoose = require('mongoose')
const { PlaylistSongs } = require('../model/playlistSongsModel')

playlistSongsController.add = async (req, res) => {
    try {
        const item = new PlaylistSongs(req.body)
        console.log(req.user.id)
        const itemIn = await PlaylistSongs.find({
            user_id: req.user.id,
            song_id: item.song_id,
            menu_id: item.menu_id,
            playlist_id: item.playlist_id,
            is_deleted: false
        })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Song Already Added To Playlist"
            }
            res.status(400).json(response)
        }
        else if (!item.song_id || !item.menu_id || !item.playlist_id || !req.user.id) {
            let response = {
                "status": 400,
                "message": "Please Enter song id, menu id, playlist id and user id"
            }
            res.status(400).json(response)
        }
        else {
            item.user_id = req.user.id
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
                        "message": "Song Added To Playlist Successfully",
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

playlistSongsController.getAll = async (req, res) => {
    try {
        const itemsIn = await PlaylistSongs.find({ playlist_id: req.body.playlist_id, user_id: req.user.id, is_deleted: false })
        if (itemsIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Songs In Playlist",
                "data": itemsIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "Playlist Empty"
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


playlistSongsController.delete = async (req, res) => {
    try {
        const playlistSongId = mongoose.Types.ObjectId(req.params.id)
        const item = await PlaylistSongs.find({ playlist_id: req.body.playlist_id, user_id: req.user.id, _id: playlistSongId, is_deleted: false })
        console.log(item[0])

        if (item.length != 1) {
            let response = {
                "status": 404,
                "message": "Song Not Found In Playlist",
            }
            res.status(404).json(response)
        }
        else {
            item[0].set({ is_deleted: true })
            let updatedPlaylist = await item[0].save();
            let response = {
                "status": 200,
                "message": "Song Deteted From Playlist Successfully",
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
playlistSongsController.deleteAll = async (req, res) => {
    try {
        const playlistSongId = mongoose.Types.ObjectId(req.params.id)
        const allItem = await PlaylistSongs.find({ playlist_id: req.body.playlist_id, user_id: req.user.id, is_deleted: false })

        if (allItem.length ==0) {
            let response = {
                "status": 404,
                "message": "Playlist Already Empty",
            }
            res.status(404).json(response)
        }
        else {
            allItem.forEach(item =>{
                item.set({ is_deleted: true })
                item.save()

            } )
            let response = {
                "status": 200,
                "message": "Songs Deteted From Playlist Successfully",
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
module.exports = playlistSongsController