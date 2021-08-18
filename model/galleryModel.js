const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GallerySchema = Schema({
    image: { type: String, default: null },
    image_status: { type: Number, required: true, default: 1 },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },

});

const Gallery = mongoose.model('gallery', GallerySchema)

module.exports = { "Gallery": Gallery }
