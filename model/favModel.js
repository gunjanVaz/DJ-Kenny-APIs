const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FavSchema = Schema({
    menu_id:{type: Schema.Types.ObjectId, ref: 'menu'},
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    song_id: { type: Schema.Types.ObjectId, ref: 'songs' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const Fav = mongoose.model('favorites', FavSchema)

module.exports = { "Fav": Fav }
