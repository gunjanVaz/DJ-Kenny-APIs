const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotificationSchema = Schema({
    title: { type: String, default: null },
    message: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },

});

const Notification = mongoose.model('notifications', NotificationSchema)

module.exports = { "Notification": Notification }
