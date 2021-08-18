const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TncSchema = Schema({
    description: {type: String, required: true},
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})
const Tncs = mongoose.model('tncs', TncSchema)

module.exports = { "Tncs": Tncs }
