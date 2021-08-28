const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SponsorSchema = Schema({
    image: { type: String, default: null },
    link: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});

const BannerSchema = Schema({
    image: { type: String, default: null },
    link: { type: String, default: null },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    is_deleted: { type: Boolean, required: true, default: false },
});


const Sponsor = mongoose.model('sponsorslider', SponsorSchema)
const Banner = mongoose.model('bannerslider', BannerSchema)

module.exports = { "Sponsor": Sponsor, "Banner": Banner }
