require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
auth = {}

auth.guestToken = (user) => {
    return jwt.sign(user, process.env.GUEST_TOKEN_SECRET, {
        expiresIn: '1d'
    })
}

auth.generateToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    })
}

auth.generateRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

auth.authorization = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.send({
        "status": 401,
        "message": "Token Not found"
    });
    token = token.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.send({
            "status": 403,
            "message": "Token Invalid"
        });
        req.user = user;
        next();
    });
}

module.exports = auth;
