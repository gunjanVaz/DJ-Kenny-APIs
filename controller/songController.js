const songController = {}
const mongoose = require('mongoose')
const Songs = require('../model/songModel').Songs;
const multer = require('multer')
const getMP3Duration = require('get-mp3-duration')
const fs = require('fs');
const format = require('format-duration')

//controller to upload a song
songController.add = async (req, res) => {
    try {
        if (!req.body.song_url || !req.body.song_name) {
            let response = {
                "status": 400,
                "message": "Song Name And URL Required",
            }
            res.status(400).json(response)
        }
        else {
            let song = new Songs(req.body)
            let songs = await Songs.find({ is_deleted: false }).sort({ position: 1 })

            if (songs.length == 0) {
                song.position = 1
            }
            else {
                songs.forEach(sng => {

                    sng.position += 1
                    sng.save()
                })
            }
            //song position
            song.position = 1
            //song name
            song.song_file = req.file.filename;
            //song duration
            const buffer = fs.readFileSync('./storage/songs/' + req.file.filename)
            const duration = getMP3Duration(buffer)
            const dur=format(duration) // '0:01'
            song.song_duration=dur
            await song.save((err) => {
                if (err) {
                    songs.forEach(sng => {

                        sng.position -= 1
                        sng.save()
                    })
                    let response = {
                        "status": 400,
                        "message": "Error In Saving Data",
                        "Error": [err]
                    }
                    res.status(400).json(response)
                }
                else {
                    let response = {
                        "status": 200,
                        "message": "Song Saved Successfully",
                        "Song": [song]
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
            return res.status(400).json({
                "status": 400,
                "message": errors
            });
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

//controller to get all the songs
songController.get=async (req,res)=>{
    try{
        let allSongs= await Songs.find({ is_deleted: false }).sort({ position: 1 })
        let response={
            "status": 200,
            "message": "Available front tracks.",
            "data": allSongs
        }
res.status(200).json(response)
    }
    catch (err) {
        console.log(err)
        let response = {
            "status": 500,
            "message": "Internal Server Error",
            "Error": [err.message]
        }
        res.status(500).json(response)
    }
}

module.exports = songController