const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SongSchema = Schema({
    song_name: {type:String, default:null},
    song_artist: { type: String, default:null},
    song_image: { type: String, default:null},
    song_url: { type: String, default:null },
    song_file: { type: String, default:null},
    song_duration: { type: String, default:null },
    likes_count:{type:Number, required:true, default:0},
    likes_status:{type:Boolean, required:true, default:0},
    favourites_count:{type:Number, required:true, default:0},
    total_played:{type:Number, required:true, default:0},
    total_shared:{type:Number, required:true, default:0},
    position:{type:Number, required:true, default:0},
    is_deleted:{type:Boolean,required:true,default:false},
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    menu_id:{type: Schema.Types.ObjectId, ref: 'menu'},
    category_id: {type: Schema.Types.ObjectId, ref: 'category'},
    categoryitems_id:{type: Schema.Types.ObjectId, ref: 'categoryitems'},
});


const Songs = mongoose.model('songs', SongSchema)

module.exports = { "Songs":Songs }
