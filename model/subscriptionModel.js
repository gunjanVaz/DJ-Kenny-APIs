const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubscriptionSchema = Schema({

    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    name: { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    dob: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },

});

const Subscription = mongoose.model('subscriptions', SubscriptionSchema)

module.exports = { "Subscription": Subscription }
