const playlistController = {}
const mongoose = require('mongoose')
const { Playlist } = require('../model/playlistModel')

playlistController.add = async (req, res) => {
    try {
        const item = new Playlist(req.body)
        console.log(req.user.id)
        const itemIn = await Playlist.find({
            user_id: req.user.id,
            playlist_name: item.playlist_name,
            is_deleted: false
        })
        if (itemIn.length > 0) {
            let response = {
                "status": 400,
                "message:": "Playlist Exists"
            }
            res.status(400).json(response)
        }
        else if (!item.playlist_name) {
            let response = {
                "status": 400,
                "message": "Please Enter A Name For Your Playlist"
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
                        "message": "Playlist Added Successfully",
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

playlistController.getAll = async (req, res) => {
    try {
        const itemsIn = await Playlist.find({ user_id: req.user.id, is_deleted: false })
        if (itemsIn.length > 0) {
            let response = {
                "status": 200,
                "message": "Available Playlists",
                "data": itemsIn
            }
            res.status(200).json(response)
        }
        else {
            let response = {
                "status": 400,
                "message": "No Playlist Available"
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


playlistController.delete = async (req, res) => {
    try {
        const playlistId = mongoose.Types.ObjectId(req.params.id)
        console.log(playlistId)
        const item = await Playlist.find({ user_id: req.user.id, _id: playlistId, is_deleted: false })
        console.log(item[0])

        if (item.length != 1) {
            let response = {
                "status": 404,
                "message": "Playlist Not Found",
            }
            res.status(404).json(response)
        }
        else {
            item[0].set({ is_deleted: true })
            let updatedPlaylist = await item[0].save();
            let response = {
                "status": 200,
                "message": "Playlist Deleted Successfully",
                "data": updatedPlaylist
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

module.exports = playlistController