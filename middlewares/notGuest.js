validator={}
validator.validationGuest=(req,res)=>{
    if(req.body.role.toLowerCase()=='user'||req.body.role.toLowerCase()=='admin'){
        if (!req.body.name || !req.body.username || !req.body.email || !req.body.phoneNumber || !req.body.password || !req.body.confirm_password) {
            let response = {
                "status": 400,
                "message": "Please Enter Name, Username, Email,phoneNumber, Password, Confirm Password"
            }
            res.status(400).json(response)
        }
    }
}

module.exports=validator