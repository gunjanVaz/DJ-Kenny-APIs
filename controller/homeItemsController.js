const homeItemsController = {}
const mongoose = require('mongoose')
const {Videos} = require('../model/videoModel');
const {Radio} = require('../model/radioModel');
homeItemsController.get = async (req, res) => {
    try {
        let liveVideo = await Videos.find({ livetv_status: true, is_deleted: false }).sort({ position: 1 })
        let liveRadio = await Radio.find({ is_deleted: false }).sort({ position: 1 })
        let popVideo = await Videos.find({ popup_status: true, is_deleted: false }).sort({ position: 1 })
        let response = {
            "status": 200,
            "message": "Available Home Items",
            "livetvvideo_data":liveVideo,
            "radio_data":liveRadio,
            "popupvideo_data":popVideo
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

module.exports=homeItemsController