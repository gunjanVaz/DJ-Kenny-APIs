const uploadsController = {}
path = module.require('path')

//to upload an image
try {
    uploadsController.uploads = (req, res) => {
        console.log(req.file);
        res.status(200).send({
            "message": "Image upload successfully.",
            "url": 'http://localhost:3000/djkenny/api/uploads/' + req.file.filename
        })
    }
}
catch (err) {
    console.log(err)
}
//to view an image
try {
    uploadsController.get = (req, res) => {
        const filename = req.params.filename
        const image = path.join(__dirname + '\\..\\storage\\uploads\\' + filename)
        res.sendFile(image);
    }
}
catch (err) {
    console.log(err)
}

module.exports = uploadsController;
