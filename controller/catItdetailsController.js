const catItdetailsController = {}
const mongoose = require('mongoose')
const { Videos } = require('../model/videoModel')
const { Songs } = require('../model/songModel')
// controller to get videos category and tracks category response
catItdetailsController.get = async (req, res) => {
    try {
        const menu_type = req.query.type;
        if (menu_type.toLowerCase() === 'categoryvideos') {
            const menu_id = req.body.menu_id;
            const category_id = req.body.category_id;
            const video_id = req.body.video_id;
            
            if (!menu_id || !category_id || !video_id) {
                let response = {
                    "status": 400,
                    "message": "Please enter menu id , category id and video id"
                }
                res.status(400).json(response)
            }
            else {
                const items = await Videos.find({ menu_id: menu_id, category_id: category_id, _id: video_id, is_deleted: false })
                const suggestions = await Videos.find({ menu_id: menu_id, category_id: category_id, is_deleted: false })
                let response = {
                    "status": 200,
                    "message": "Available Category Videos",
                    "data": items,
                    "suggested data": suggestions.filter((sugg)=>{
                        let ans=sugg._id!=video_id
                        return ans
                    })
                }
                res.status(200).json(response)
            }
        }

        else if (menu_type.toLowerCase() === 'categorytracks') {
            const menu_id = req.body.menu_id;
            const category_id = req.body.category_id;
            const song_id = mongoose.Types.ObjectId(req.body.song_id);
            if (!menu_id || !category_id || !song_id) {
                let response = {
                    "status": 400,
                    "message": "Please enter menu id , category id and song id"
                }
                res.status(400).json(response)
            }
            else {
                const items = await Songs.find({ menu_id: menu_id, category_id: category_id, _id: song_id, is_deleted: false })
                let response = {
                    "status": 200,
                    "message": "Available Category Tracks",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else if (menu_type.toLowerCase() === 'videos') {
            const menu_id = req.body.menu_id;
            const video_id = mongoose.Types.ObjectId(req.body.video_id);
            if (!menu_id || !video_id) {
                let response = {
                    "status": 400,
                    "message": "Please enter menu id and video id"
                }
                res.status(400).json(response)
            }
            else {
                const items = await Videos.find({ menu_id: menu_id, _id: video_id, is_deleted: false })
                let response = {
                    "status": 200,
                    "message": "Available Video Details",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else if (menu_type.toLowerCase() === 'tracks') {
            const menu_id = req.body.menu_id;
            const song_id = req.body.song_id;
            if (!menu_id || !song_id) {
                let response = {
                    "status": 400,
                    "message": "Please enter menu id and song id"
                }
                res.status(400).json(response)
            }
            else {
                const items = await Songs.find({ menu_id: menu_id, _id: song_id, is_deleted: false })
                let response = {
                    "status": 200,
                    "message": "Available Song Details",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else {
            let response = {
                "status": 400,
                "message": "Details Not Found",
                "data": items
            }
            res.status(200).json(response)
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

module.exports = catItdetailsController;