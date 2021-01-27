const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

// Schema
const adminSchema = new Schema({
    username: { type: String, required: [true,'请输入用户名'] },
    password: { type: String, required: [true,'请输入密码'] },
    avatar: { type: String },//封面配图
    content:{type: String,},//座右铭
    createDate:{type: Date},//创建时间
    phone:{type: String,},//手机号
    email:{type: String,},//邮箱
    QQ:{type: String,},//qq
    WX:{type: String,},//qq
    status:{type: Number, enum: [2,1,0], default: 2 },// 1 管理员；2 普通用户；0 删除
    token:{type: String},
    nickname:{type: String},
})

// Model

module.exports = mongoose.model('Admin',adminSchema);