const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InstaLinkSchema = Schema({
    link: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});
const DrakeLinkSchema = Schema({
    link: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});
const SupportLinkSchema = Schema({
    link: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});
const InstaLink = mongoose.model('instagramlink', InstaLinkSchema)
const DrakeLink = mongoose.model('djdrakelink', DrakeLinkSchema)
const SupportLink = mongoose.model('supportlink', SupportLinkSchema)

module.exports = { "InstaLink": InstaLink ,"DrakeLink":DrakeLink,"SupportLink":SupportLink}

