const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = Schema({
    role: {type:String, default:null},
    name: { type: String, default:null},
    username: { type: String, default:null},
    email: { type: String, default:null},
    phoneNumber: { type: String, default:null},
    password: { type: String, default:null },
    is_deleted:{type:Boolean, default:false},
    image:{ type: String, default:null},
    fcm_id:{type: String,  default:null},
    device: {type: String,default:null},
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    refreshToken: { type: String,default:null }
});

const RoleSchema = Schema({
    name: { type: String, required: true }
});
const Users = mongoose.model('users', UserSchema)
const Roles = mongoose.model('roles', RoleSchema);

module.exports = { "Users": Users,"Roles":Roles }
