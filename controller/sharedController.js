const sharesController = {}
const mongoose = require('mongoose')
const sharedModel = require('../model/sharedModel')
const { Shared } = require('../model/sharedModel')
const { Songs } = require('../model/songModel')

sharesController.shared = async (req, res) => {
    try {
        let share = new Shared(req.body)
        share.user_id = req.user.id
        if (!share.user_id || !share.song_id) {
            let response = {
                "status": 400,
                "message": "Please Enter User Id, Song Id"
            }
            res.status(400).json(response)
        }
        else {
            let song = await Songs.findOne({ _id: share.song_id, is_deleted: false })
            song.total_shared += 1
            await song.save((err) => {
                if (err) {
                    song.total_shared -= 1
                    song.save()
                    let response = {
                        "status": 400,
                        "message": "Error In Saving Data",
                        "Error": [err]
                    }
                    res.status(400).json(response)
                }
            })
            await share.save((err) => {
                if (err) {
                    let response = {
                        "status": 400,
                        "message": "Error In Saving Data",
                        "Error": [err]
                    }
                    res.status(400).json(response)
                    song.save(async (err) => {
                        if (err) {
                            song.total_shared -= 1
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
                        "message": "Shared Successfully",
                        "total_shared": song.total_shared,
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

module.exports = sharesController
