const googleadsController = {}
const mongoose = require('mongoose')
const {Googleads} = require('../model/googleadsModel')
const {ShareMyApps} = require('../model/sharemyappModel')
const {Links} = require('../model/socialMediaModel')


//controller to get all the images
googleadsController.addAd=async(req,res)=>{
    const ad=new Googleads(req.body)
    ad.save()
}
googleadsController.getAds=async (req,res)=>{
    try{
        const ads=await Googleads.find({is_deleted:false})
        console.log(ads)
            let response = {
                "status": 200,
                "message": "Available google ads keys",
                "data": ads
            }
            res.status(200).json(response)
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
googleadsController.addShare=async(req,res)=>{
    const share=new ShareMyApps(req.body)
    share.save()
}
googleadsController.getShare=async (req,res)=>{
    try{
        const share=await ShareMyApps.find({is_deleted:false})
            let response = {
                "status": 200,
                "message": "Available Share My App Details",
                "data": share
            }
            res.status(200).json(response)
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
googleadsController.addLink=async(req,res)=>{
    const links=new Links(req.body)
    links.save()
}
googleadsController.getLink=async (req,res)=>{
    try{
        const links=await Links.find({is_deleted:false})
            let response = {
                "status": 200,
                "message": "Available Social Media Details",
                "data": links
            }
            res.status(200).json(response)
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
module.exports = googleadsController
