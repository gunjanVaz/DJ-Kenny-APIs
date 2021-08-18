const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GoogleadsSchema = Schema({
    android_banner: { type: String, default: null },
    android_interstitial: { type: String, default: null },
    ios_banner: { type: String, default: null },
    ios_interstitial: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const Googleads = mongoose.model('googleads', GoogleadsSchema)

module.exports = { "Googleads": Googleads }

