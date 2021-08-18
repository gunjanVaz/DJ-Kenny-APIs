const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrivacyPolicySchema = Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },

})
const PrivacyPolicys = mongoose.model('privacyPolicys', PrivacyPolicySchema)

module.exports = { "PrivacyPolicys": PrivacyPolicys }
