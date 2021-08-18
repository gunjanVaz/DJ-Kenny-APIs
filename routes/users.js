const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
const validator = require('../middlewares/notGuest')
const auth = require('../auth')

//route for sign up user
router.post('/signup', userController.signUp)

//route for skip user
router.post('/guest', userController.skipUser)

//router for sign in user
router.post('/signin', userController.signIn)

//router for sign out user
router.post('/signout', auth.authorization, userController.signOut)

//router for view profile 
router.get('/:id', auth.authorization, userController.profileView)

//router for forgot password
router.put('/forgotpassword', userController.forgotPassword)

//router for change password
router.put('/changePassword/:id', auth.authorization, userController.changePassword)

//router to update user's profile
router.put('/:id', auth.authorization, userController.profileUpdate)

module.exports = router;

