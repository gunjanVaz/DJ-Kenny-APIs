const sentEmail = require('../helpers/mail.js')
const pug = require('pug')
const path = require('path')




const EmailController = {}

// EmailController.confirmRegistration = async (user) => {

//     let mailOptions = {
//         from: "Flow Academy <process.env.EMAIL_ID>",
//         to: user.email,
//         subject: "Account Successfully Created",
//         html: pug.renderFile(path.join(__dirname, '../', '/public/registrationEmail.pug'), {user: user})
//     }

//     var result = await sentEmail(mailOptions)

// }

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

// EmailController.resetPassword = async (user) => {

//     let mailOptions = {
//         from: "Flow Academy <process.env.EMAIL_ID>",
//         to: user.email,
//         subject: "Password Changed Successfully",
//         html: pug.renderFile(path.join(__dirname, '../', '/public/passwordUpdated.pug'), {user: user})
//     }

//     var result = sentEmail(mailOptions)
//     console.log(result);

// }


// EmailController.contactRequestAdmin = async (contact) => {
//     let mailOptions = {
//         from: `${contact.name} <contact.email>`,
//         to: process.env.EMAIL_ID,
//         subject: "Contact Request",
//         html: pug.renderFile(path.join(__dirname, '../', '/public/contactRequestAdmin.pug'), {contact: contact})
//     }

//     var result = sentEmail(mailOptions)
//     console.log(result);
// }


// EmailController.contactRequestUser = async (contact) => {
//     let mailOptions = {
//         from: "Flow Academy <process.env.EMAIL_ID>",
//         to: contact.email,
//         subject: "Contact Request Sent Successfully",
//         html: pug.renderFile(path.join(__dirname, '../', '/public/contactRequestUser.pug'), {contact: contact})
//     }

//     var result = sentEmail(mailOptions)
//     console.log(result);
// }

// EmailController.subscriptionCreated = async (user, plan, file) => {

//     let mailOptions = {
//         from: "Flow Academy <process.env.EMAIL_ID>",
//         to: user.email,
//         subject: "Subscription Created Successfully",
//         attachments: [{
//             filename: "SubscriptionInvoice.pdf",
//             path: file,
//             contentType: 'application/pdf'
//           }]
//     }

//     var result = sentEmail(mailOptions)
//     console.log(result);

// }


module.exports = EmailController
