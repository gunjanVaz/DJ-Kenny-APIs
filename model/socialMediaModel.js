const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SocialSchema = Schema({
    instagram_link: { type: String, default: null },
    facebook_link: { type: String, default: null },
    twitter_link: { type: String, default: null },
    other_link: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const Links = mongoose.model('socialmedialinks', SocialSchema)

module.exports = { "Links": Links }

