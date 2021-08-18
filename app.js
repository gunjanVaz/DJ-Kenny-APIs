require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/index.js')
const app = express()
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', error => {
    console.error('Error in MongoDb connection: ' + error);
})
db.on('connected', () => console.log('Data Db connected'));
app.use(router)
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("listening at port " + PORT);
});
