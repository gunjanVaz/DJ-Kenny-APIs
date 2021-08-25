const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlaylistSongsSchema = Schema({
    menu_id: { type: Schema.Types.ObjectId, ref: 'menus' },
    user_id: { type: Schema.Types.ObjectId, ref: 'users' },
    playlist_id: { type: Schema.Types.ObjectId, ref: 'playlists' },
    song_id: { type: Schema.Types.ObjectId, ref: 'songs' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});
const PlaylistSongs = mongoose.model('playlistsongs', PlaylistSongsSchema)

module.exports = { "PlaylistSongs": PlaylistSongs }
 