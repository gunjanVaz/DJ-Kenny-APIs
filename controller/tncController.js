const tncController = {}
const mongoose = require('mongoose')
const Tnc = require('../model/tncModel').Tncs
const PrivacyPolicy = require('../model/ppModel').PrivacyPolicys
//get terms and conditions
tncController.view = async (req, res) => {
    try {
        tncExists = await Tnc.find()
        ppExists = await PrivacyPolicy.find()

        if (tncExists.length == 0 && ppExists.length == 0) {
            res.send({ 'message': 'No terms and Conditions' })
        }
        else {
            res.send({
                "status": 200,
                "message": "Viewing terms and conditions.",
                "terms_data": tncExists,
                "privacy_data": ppExists
            }
            )
        }

    }
    catch (err) {
        console.log(err)
    }
}
//add and update terms and conditions and ptivacy policy
tncController.add = async (req, res) => {
    try {
        tncExists = await Tnc.find()
        ppExists = await PrivacyPolicy.find()

        if (tncExists.length == 0 && ppExists.length == 0) {
            tnc = await Tnc.create({
                description: req.body.termsOfUse,
            })

            pp = await PrivacyPolicy.create({
                description: req.body.privacyPolicy,
            })
            res.status(200).send({
                "status": 200,
                "message": "Legal Details Added.",
                "terms_data": [tnc],
                "privacy_data": [pp]
            }
            )
        }
        else {
            await tncExists[0].set({ description: req.body.termsOfUse })
            tncExists[0].save()
            await ppExists[0].set({ description: req.body.privacyPolicy })
            ppExists[0].save()

            res.status(200).send({
                "status": 200,
                "message": "Legal Details Updated.",
                "terms_data": tncExists,
                "privacy_data": ppExists
            }
            )
        }
    }
    catch (err) {
        console.log(err)
    }
}

//delete terms and Conditions and Privacy policy
tncController.delete = async (req, res) => {
    try {
        tncExists = await Tnc.find()
        ppExists = await PrivacyPolicy.find()
        tncExists[0].delete()
        ppExists[0].delete()
        res.status(200).send({
            "status": 200,
            "message": "Deleted Successfully.",
        }
        )

    }
    catch (err) {
        console.log(err)
    }
}
module.exports = tncController
