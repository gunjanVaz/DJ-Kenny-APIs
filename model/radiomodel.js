const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RadioSchema = Schema({
    radio_name: {type:String, default:null},
    radio_image: { type: String, default:null},
    radio_link: { type: String, default:null },
    position:{type:Number, required:true, default:0},
    is_deleted:{type:Boolean,required:true,default:false},
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    menu_id:{type: Schema.Types.ObjectId, ref: 'menu',default:null},
});

const Radio = mongoose.model('radios', RadioSchema)

module.exports = { "Radio":Radio}
