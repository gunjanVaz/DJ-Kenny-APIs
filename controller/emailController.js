const sentEmail = require('../helpers/mail.js')
const pug = require('pug')
const path = require('path')




const EmailController = {}


EmailController.forgetPassword = async (user, password) => {
    console.log(user.email)

    let mailOptions = {
        from: "DJ Kenny <process.env.EMAIL_ID>",
        to: user.email,
        subject: "New Temporary Password",
        html: pug.renderFile(path.join(__dirname, '../', '/public/forgetPassword.pug'), {user: user, password: password})
    }
    var result = sentEmail(mailOptions)
    console.log('hre',result);

}



module.exports = EmailController
