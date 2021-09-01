const headerMenuController = {}
const mongoose = require('mongoose')
const { Menu } = require('../model/menuModel');
const { Songs } = require('../model/songModel');
const { Radio } = require('../model/radioModel');

headerMenuController.get = async (req, res) => {
    try {
        let livemenu = await Menu.find({ visible_status: true, is_deleted: false })
        let liveSongs = await Songs.find({ livetv_status: true, is_deleted: false })
        let radios = await Radio.find({ is_deleted: false })
        const data = []
        const raddata = []

        livemenu.forEach((item) => {
            liveSongs.forEach((song) => {
                if (song.menu_id.toString() === item._id.toString()) {
                    data.push({ menu_id: song.menu_id, visible_status: item.visible_status })
                }
            })
        })
        
        livemenu.forEach((item) => {
            radios.forEach((radio) => {
                console.log(radio.menu_id, item._id)
                if (radio.menu_id.toString() === item._id.toString()) {
                    raddata.push({ menu_id: radio.menu_id, visible_status: item.visible_status })
                }
            })
        })
        let response = {
            "status": 200,
            "message": "Available Home Items",
            "livetv_menu_data": data,
            "radio_menu_data": raddata,

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

module.exports = headerMenuController