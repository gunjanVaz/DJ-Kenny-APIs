const catItController = {}
const { Videos } = require('../model/videoModel')
const { Songs } = require('../model/songModel')
// controller to get videos category and tracks category response
catItController.get = async (req, res) => {
    try {
        const menu_id = req.query.menu_id;
        const menu_type = req.query.category_for;
        const category_id = req.query.category_id;
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        if (menu_type.toLowerCase() === 'videos') {
            const items = await Videos.find({ menu_id: menu_id, category_id: category_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Category Videos",
                    "data": resultItems,
                    "per_page": limit,
                    "current_page": page,
                    "last_page": Math.ceil(resultItems.length / limit)
                }
                res.status(200).json(response)
            }
            else {
                let response = {
                    "status": 200,
                    "message": "Available Category Videos",
                    "data": items
                }
                res.status(200).json(response)
            }
        }

        else if (menu_type.toLowerCase() === 'tracks') {
            const items = await Songs.find({ menu_id: menu_id, category_id: category_id, is_deleted: false })
            if (page && limit) {
                let startIndex = (page - 1) * limit
                let endIndex = page * limit

                const resultItems = items.slice(startIndex, endIndex)
                let response = {
                    "status": 200,
                    "message": "Available Category Songs",
                    "data": resultItems,
                    "per_page": limit,
                    "current_page": page,
                    "last_page": Math.ceil(resultItems.length / limit)
                }
                res.status(200).json(response)
            }
            else {
                let response = {
                    "status": 200,
                    "message": "Available Category Songs",
                    "data": items
                }
                res.status(200).json(response)
            }
        }
        else {
            let response = {
                "status": 400,
                "message": "Category Not Found",
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

module.exports=catItController;