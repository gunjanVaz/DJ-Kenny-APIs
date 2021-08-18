const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BiographySchema = Schema({

    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const Biography = mongoose.model('biography', BiographySchema)

module.exports = { "Biography": Biography }
