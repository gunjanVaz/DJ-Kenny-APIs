const likesController = {}
const mongoose = require('mongoose')
const { Likes } = require('../model/likesModel')

likesController.like=(req,res)=>{
    try{
    let like=new Likes(req.body)
    if()
    {}
    }
    catch(err){

    }
}

module.exports=likesController