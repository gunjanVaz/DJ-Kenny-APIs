const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = Schema({
    menu_id: { type: Schema.Types.ObjectId, ref: 'menu' },
    category_image: { type: String, default: null },
    category_name: { type: String, default: null },
    category_for: { type: String, default: null },
    category_type: { type: String, default: null },
    image_status: { type: Boolean, required: true, default: 0 },
    position: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const SubCategorySchema = Schema({
    category_id: { type: Schema.Types.ObjectId, ref: 'category' },
    menu_id: { type: Schema.Types.ObjectId, ref: 'menu' },
    sub_category_image: { type: String, default: null },
    sub_category_name: { type: String, default: null },
    sub_category_for: { type: String, default: null },
    image_status: { type: Boolean, required: true, default: 0 },
    position: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const CategoryItemsSchema = Schema({
    menu_id: { type: Schema.Types.ObjectId, ref: 'menu' },
    category_id: { type: Schema.Types.ObjectId, ref: 'category' },
    sub_category_id: { type: Schema.Types.ObjectId, ref: 'subcategory' },
    song_id: { type: Schema.Types.ObjectId, ref: 'songs' },
    video_id: { type: Schema.Types.ObjectId, ref: 'videos' },
    radio_id: { type: Schema.Types.ObjectId, ref: 'radios' },
    image_status: { type: Boolean, required: true, default: 0 },
    popup_video_status: { type: Boolean, required: true, default: 0 },
    position: { type: Number, required: true, default: 1 },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const Category = mongoose.model('category', CategorySchema)
const CategoryItems = mongoose.model('categoryitems', CategoryItemsSchema)
const SubCategory = mongoose.model('subcategory', SubCategorySchema)

module.exports = { "Category": Category, "CategoryItems": CategoryItems, "SubCategory": SubCategory }
