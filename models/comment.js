const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// Schema
const commentSchema = new Schema({
    article:{type: ObjectId, required: true, ref: 'Article'},
    avatar: { type: Array },//封面配图
    browse: {type: Number, default: 0}, //浏览量
    content:{type: String, required: true},//内容
    createDate:{type: Date},//创建时间
    status:{type: Number, enum: [2,1,0], default: 0 },// 1 上架；2 下架；0 删除
    author:{type: ObjectId, required: true, ref: 'Admin'}, //作者
    replyComment:{type: ObjectId, ref: 'Comment'},
    replyContent:{type: String},
    replyUser:{type: ObjectId, ref: 'Admin'},
    updateDate: {type: Date},//更新时间
})

// Model

module.exports = mongoose.model('Comment',commentSchema);