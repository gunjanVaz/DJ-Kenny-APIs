const userController = {}
const { Users, Roles } = require('../model/userModel');
const bcrypt = require('bcryptjs')
const auth = require('../auth')
const mongoose = require('mongoose')
const crypto = require('crypto')
const EmailController = require('./emailController')
//controller for signup user

userController.signUp = async (req, res) => {
    try {
        const user = new Users(req.body)
        const confirm_password = req.body.confirm_password;

        if (!user.name || !user.username || !user.email || !user.phoneNumber || !user.password || !confirm_password) {
            let response = {
                "status": 400,
                "message": "Please Enter Name, Username, Email,Phone Number, Password, Confirm Password"
            }
            res.status(400).json(response)
        }
        else {
            ro = req.body.role.toLowerCase()
            if (ro.toLowerCase() == 'admin' || ro.toLowerCase() == 'user') {
                var rolee = ro
            }
            else {
                let response = {
                    "status": 500,
                    "message": "Role Should Be Either User Or Admin"
                }
                res.status(500).json(response)
            }
            const role = await Roles.find({ "name": rolee })
            if (role && role.length < 1) {
                let response = {
                    "status": 500,
                    "message": "Model Role Not Created"
                }
                res.status(500).json(response)
            }
            else {
                let email = req.body.email
                let username = req.body.username
                let password = req.body.password
                let emailExists = await Users.find({ email: email, is_deleted: false })
                let usernameExists = await Users.find({ username: username, is_deleted: false })
                let emailRegex = /\S+@\S+\.\S+/;
                let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

                if (emailExists.length > 0 || usernameExists.length > 0) {
                    let response = {
                        "status": 400,
                        "message:": "Email-Id or username exists"
                    }
                    res.status(400).json(response)
                }
                else if (!emailRegex.test(email)) {
                    let response = {
                        "status": 400,
                        "message": "Email Not In Proper Format"
                    }
                    res.status(400).json(response)
                }
                else if (!passwordRegex.test(password)) {
                    let response = {
                        "status": 400,
                        "message": "Password Should Be Minimum 8 Character With Atleast 1 Number, 1 Uppercase, 1 Alphabet & 1 Specical Character"
                    }
                    res.status(400).json(response)
                }

                else if (password.length < 5 || password.length > 20) {
                    let response = {
                        "status": 400,
                        "message": "Password Should Be Atleast 5 And Atmost 20 Character Long"
                    }
                    res.status(400).json(response)
                }

                else if (password != confirm_password) {
                    let response = {
                        "status": 400,
                        "message": "Password And Confirm Password Doesn't Match"
                    }
                    res.status(400).json(response)
                }

                else {
                    const salt = await bcrypt.genSalt()
                    const hashedPassword = await bcrypt.hash(password, salt)
                    user.password = hashedPassword
                    user.confirmPassword = hashedPassword

                    await user.save((err) => {
                        if (err) {
                            let response = {
                                "status": 500,
                                "message": "Error In Saving Data",
                                "Error": [err]
                            }
                            res.status(500).json(response)
                        }
                        else {
                            let response = {
                                "status": 200,
                                "message": "Sign up successfully",
                            }
                            res.status(200).json(response)
                        }
                    })
                }
            }
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
            return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error"
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

//controller for skipUser
userController.skipUser = async (req, res) => {
    try {
        let fcm_id = req.body.fcm_id
        let device = req.body.device
        const user = new Users(req.body)
        if (!user.fcm_id || !user.device) {
            let response = {
                "status": 400,
                "message": "fcm_id Or Device Not Given"
            }
            res.status(400).json(response)
        }
        else {
            ro = req.body.role.toLowerCase()
            if (ro.toLowerCase() == 'guest') {
                var rolee = ro
            }
            else {
                let response = {
                    "status": 500,
                    "message": "Role Should Be Guest"
                }
                res.status(500).json(response)
            }
            const role = await Roles.find({ "name": "guest" })
            if (role && role.length < 1) {
                let response = {
                    "status": 500,
                    "message": "Model Role Not Created"
                }
                res.status(500).json(response)
            }
            else {
                await user.save((err) => {
                    if (err) {
                        let response = {
                            "status": 500,
                            "message": "Error In Saving Data",
                            "Error": [err]
                        }
                        res.status(500).json(response)
                    }
                    else {
                        let response = {
                            "status": 200,
                            "message": "Skip Successfully.",
                            "token": auth.guestToken({ id: user._id }),
                            "user_id": user._id,
                            "fcm_id": fcm_id,
                            "device": device
                        }
                        res.status(200).json(response)
                    }
                })
            }
        }

    }
    catch {
        console.log(err)
    }
}

//controller for signIn
userController.signIn = async (req, res) => {
    try {
        let { email, password, device, fcm_id } = req.body;
        let emailRegex = /\S+@\S+\.\S+/;

        //sign in with email id
        if (emailRegex.test(email)) {
            const user = await Users.findOne({ email: email, is_deleted: false })
            if (!user) {
                let response = {
                    status: 500,
                    message: "Not Registered With This Email-Id"
                }
                res.status(500).json(response)
            }
            else {
                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.compare(password, user.password)
                if (!hashedPassword) {
                    let response = {
                        status: 500,
                        message: "Incorrect Password"
                    }
                    res.status(500).json(response)
                }
                else {
                    let accessToken = auth.generateToken({ email: user.email, password: user.password });
                    let refreshToken = auth.generateRefreshToken({ email: user.email, password: user.password })
                    await user.set({
                        refreshToken: refreshToken
                    })
                    user.save()
                    let response = {

                        "status": 200,
                        "message": "Sign in successfully.",
                        "data": [
                            {
                                "image": user.image,
                                "name": user.name,
                                "username": user.username,
                                "email": user.email,
                                "phone": user.phoneNumber,
                                "fcm_id": user.fcm_id,
                                "device": user.device
                            }
                        ],
                        "token": {
                            "accessToken": accessToken,
                            "refreshToken": refreshToken
                        }
                    }
                    res.status(200).json(response)
                }
            }
        }

        //sign in with username
        else {
            const user = await Users.findOne({ username: email, is_deleted: false })
            if (!user) {
                let response = {
                    status: 500,
                    message: "Not Registered With This Username"
                }
                res.status(500).json(response)
            }
            else {
                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.compare(password, user.password)
                if (!hashedPassword) {
                    let response = {
                        status: 500,
                        message: "Incorrect Password"
                    }
                    res.status(500).json(response)
                }
                else {
                    let accessToken = auth.generateToken({ email: user.email, password: user.password });
                    let refreshToken = auth.generateRefreshToken({ email: user.email, password: user.password })
                    await user.set({
                        refreshToken: refreshToken
                    })
                    user.save()
                    let response = {

                        "status": 200,
                        "message": "Sign in successfully.",
                        "data": [
                            {
                                "image": user.image,
                                "name": user.name,
                                "username": user.username,
                                "email": user.email,
                                "phone": user.phoneNumber,
                                "fcm_id": user.fcm_id,
                                "device": user.device
                            }
                        ],
                        "token": {
                            "accessToken": accessToken,
                            "refreshToken": refreshToken
                        }
                    }
                    res.status(200).json(response)
                }
            }
        }
    }

    catch (err) {
        console.log(err)
    }
}

//controller for logout user
userController.signOut = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        console.log(refreshToken)
        user = await Users.findOne({
            refreshToken: refreshToken
        })
        user.set({ refreshToken: null })
        user.save()
        let response = {
            "success": 200,
            "message": "Sign out successfully"
        }
        res.send(response)
    }
    catch {
        res.send(err)
    }
}

//controller to update a profile
userController.profileUpdate = async (req, res) => {
    try {
        let userId = mongoose.Types.ObjectId(req.params.id)
        const user = await Users.find({ "_id": userId, "is_deleted": false })
        let emailRegex = /\S+@\S+\.\S+/;
        let phoneNumber = req.body.phoneNumber
        let email = req.body.email
        if (user.length < 1) {
            let response = {
                "status": 404,
                "message": "User Not Found",
            }
            res.status(404).json(response)
        }
        else if (phoneNumber.toString().length != 14) {
            let response = {
                "status": 400,
                "message": "Please Enter Valid Phone Number"
            }
            res.status(400).json(response)
        }
        else if (!emailRegex.test(email)) {
            let response = {
                "status": 400,
                "message": "Email Not In Proper Format"
            }
            res.status(400).json(response)
        }
        else {
            user[0].set(req.body)
            let updatedUser = await user[0].save();
            let response = {
                "status": 200,
                "message": "Profile Updated Successfully",
                "Updated User": [
                    {
                        "image": updatedUser.image,
                        "name": updatedUser.name,
                        "username": updatedUser.username,
                        "email": updatedUser.email,
                        "phoneNumber": updatedUser.phoneNumber,
                        "fcm_id": updatedUser.fcm_id,
                        "device": updatedUser.device
                    }
                ]
            }
            res.status(200).json(response)
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
            return res.status(400).send(errors);
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

//controller to view profile
userController.profileView = async (req, res) => {
    try {
        let userId = mongoose.Types.ObjectId(req.params.id)
        const user = await Users.find({ "_id": userId, "is_deleted": false })
        if (user.length != 1) {
            let response = {
                "status": 404,
                "message": "User Not Found",
            }
            res.status(400).json(response)
        }
        else {
            let response = {
                "status": 200,
                "message": "Profile Details",
                "data": [
                    {
                        "image": user[0].image,
                        "name": user[0].name,
                        "username": user[0].username,
                        "email": user[0].email,
                        "phoneNumber": user[0].phoneNumber,
                        "fcm_id": user[0].fcm_id,
                        "device": user[0].device
                    }
                ]
            }
            res.status(200).json(response)
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
            return res.status(400).send(errors);
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

userController.changePassword = async (req, res) => {
    try {
        let userId = mongoose.Types.ObjectId(req.params.id)
        const user = await Users.findOne({ "_id": userId, "is_deleted": false })
        let currentPass = req.body.current_password
        let newPassword = req.body.new_password
        let confirmPassword = req.body.confirm_password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.compare(currentPass, user.password)
        let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (user.length < 1) {
            let response = {
                "status": 404,
                "message": "User Not Found",
            }
            res.status(404).json(response)
        }
        else if(!currentPass||!newPassword||!confirmPassword){
            let response = {
                status: 400,
                message: "Enter Current Password, New Password and Confrim Password"
            }
            res.status(500).json(response)
        }
        else if (!hashedPassword) {
            let response = {
                status: 500,
                message: "Current Password Invalid"
            }
            res.status(500).json(response)
        }
        else if (!passwordRegex.test(newPassword)) {
            let response = {
                "status": 400,
                "message": "Password Should Be Minimum 8 Character With Atleast 1 Number, 1 Uppercase, 1 Alphabet & 1 Specical Character"
            }
            res.status(400).json(response)
        }

        else if (newPassword.length < 5 || newPassword.length > 20) {
            let response = {
                "status": 400,
                "message": "Password Should Be Atleast 5 And Atmost 20 Character Long"
            }
            res.status(400).json(response)
        }
        else if (newPassword === currentPass||confirmPassword===currentPass) {
            let response = {
                "status": 400,
                "message": "New Password Same As Old Password. Please Enter a different New Password"
            }
            res.status(400).json(response)
        }
        else if (newPassword != confirmPassword) {
            let response = {
                "status": 400,
                "message": "Password And Confirm Password Doesn't Match"
            }
            res.status(400).json(response)
        }

        else {
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            user.password = hashedPassword
            user.confirmPassword = hashedPassword
            await user.save((err) => {
                if (err) {
                    let response = {
                        "status": 500,
                        "message": "Error In Saving Data",
                        "Error": [err]
                    }
                    res.status(500).json(response)
                }
                else {
                    let response = {
                        "status": 200,
                        "message": "Password reset successfully. Now You will Be Redirected To Login Page"
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
                return res.status(400).send(errors);
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
    userController.forgotPassword=async(req,res)=>{
        const email = req.body.email
        console.log(email)
    if (email) {
        const user = await Users.findOne({ email: email, is_deleted: false })

        if (user.length < 1) {
            let response = {
                "status": 400,
                "message": `No User Found With EmailID ${email}`
            }
            res.status(400).json(response)
        }
        else {
            let password = crypto.randomBytes(4).toString('hex')
            
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword
            console.log(user.password)

            await user.save(err => {
                if (err) {
                    console.log("Error in storing data", err);
                    let response = {
                        "status": 500,
                        "message": "Error In Saving Data",
                        "Error": [err]
                    }
                    res.status(500).json(response)
                }
                else {
                    console.log("here",user);
                }
            })
            await EmailController.forgetPassword(user, password)
        
            let response = {
                "status": 200,
                "message": `Password Sent On EmailId ${email}`
            }
            res.status(200).json(response)
        }
    }
    else {
        let response = {
            "status": 400,
            "message": "EmailId Required"
        }
        res.status(400).json(response)
    }
    }
module.exports = userController;
