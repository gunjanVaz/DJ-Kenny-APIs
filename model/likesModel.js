const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LikesSchema = Schema({
    menu_id:{type: Schema.Types.ObjectId, ref: 'menu'},
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    song_id: { type: Schema.Types.ObjectId, ref: 'songs' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const Likes = mongoose.model('likes', LikesSchema)

module.exports = { "Likes": Likes }
