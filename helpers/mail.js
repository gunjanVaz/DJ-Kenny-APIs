var express = require('express');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.com',
    port: 587,
    ignoreTLS: false,
    secure: false,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD
    },
    tls:{rejectUnauthorized:false}
});


module.exports = function (mailOptions) {
    mailOptions = mailOptions

    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            return error
        } else {
            return response
        }
    });
}
