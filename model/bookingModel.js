const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookingSchema = Schema({

    user_id: { type: Schema.Types.ObjectId, ref: 'menu' },
    name: { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    comment: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },

});

const Booking = mongoose.model('booking', BookingSchema)

module.exports = { "Booking": Booking }
