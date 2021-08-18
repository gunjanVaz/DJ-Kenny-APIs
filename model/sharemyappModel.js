const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shareMyAppSchema = Schema({
    android_link: { type: String, default: null },
    ios_link: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const ShareMyApps = mongoose.model('sharemyapp', shareMyAppSchema)

module.exports = { "ShareMyApps": ShareMyApps }

