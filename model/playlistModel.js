const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlaylistSchema = Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    playlist_name: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});
const Playlist = mongoose.model('playlist', PlaylistSchema)

module.exports = { "Playlist": Playlist }
 