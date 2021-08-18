const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideoSchema = Schema({
    videos_name: {type:String, default:null},
    videos_description: { type: String, default:null},
    videos_image: { type: String, default:null},
    videos_link: { type: String, default:null },
    likes_count:{type:Number, required:true, default:0},
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


const Videos = mongoose.model('videos', VideoSchema)

module.exports = { "Videos":Videos }
