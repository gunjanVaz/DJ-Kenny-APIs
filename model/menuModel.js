const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MenuSchema = Schema({
    menu_image: { type: String, default: null },
    menu_name: { type: String, default: null },
    menu_type: { type: String, default: null },
    livetv_status: { type: String, required: true, default: 'No' },
    visible_status: { type: Boolean, required: true, default: 1 },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },

});

const Menu = mongoose.model('menu', MenuSchema)

module.exports = { "Menu": Menu }
