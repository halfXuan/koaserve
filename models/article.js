const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

// Schema
const articleSchema = new Schema({
    title: { type: String, required: [true,'title不能为空'] },
    source: { type: String, enum: ['原创','转载'], required: [true,'文章来源不能为空'] },
    category: { type: String, enum: ['原创','转载'], required: [true,'文章分类不能为空'] },
    avatar: { type: String },//封面配图
    commentNum:{type: Number,default: 0}, //评论数量
    browse: {type: Number, default: 0}, //浏览量
    content:{type: String,required: true},//内容
    createDate:{type: Date},//创建时间
    status:{type: Number, enum: [2,1,0], default: 0 },// 1 上架；2 下架；0 删除
    author:{type: String}, //作者
})

// Model

module.exports = mongoose.model('Article',articleSchema);