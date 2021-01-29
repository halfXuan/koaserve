const ArticleModel = require('../../models/article')
const AdminModel = require('../../models/admin')
const CommentModel = require('../../models/comment')

import Util from '../../prototype'
class Comment extends Util {
    constructor(){
        super()
        this.editComment = this.editComment.bind(this)
    }
    async addComment(ctx, next){
        const {email, nickname, author,article} = ctx.request.body
        let params = ctx.request.body
        params.createDate = this.formatDate()
        try{
            if(author){
              const result =  await new CommentModel(params).save()
              if(result){
                await ArticleModel.findByIdAndUpdate({_id: article},{$inc:{ commentNum:1}})
                ctx.body = {
                    status: 1,
                    type: 'ADD_COMMENT_SUCCESS',
                    message: '评论成功',
                } 
              }else{
                ctx.body = {
                    status: 0,
                    type: 'ADD_COMMENT_FAILED',
                    message: '评论失败',
                } 
              }
                
            }else{
                const doc = await AdminModel.findOne({email})
                if(doc){
                    ctx.body = {
                        status: 0,
                        type: 'ADD_USER_FAILED',
                        message: '邮箱已注册',
                    } 
                    return 
                }
                const result = await new AdminModel({email, nickname,password: email}).save()
                params.author = result._id
                const resultSave = await new CommentModel(params).save() 
                if(resultSave){
                    await ArticleModel.findByIdAndUpdate({_id: article},{$inc:{ commentNum:1}})
                    ctx.body = {
                        status: 1,
                        type: 'ADD_COMMENT_SUCCESS',
                        message: '评论成功，账号创建成功，可使用邮箱(同密码)直接登录',
                    } 
                  }else{
                    ctx.body = {
                        status: 0,
                        type: 'ADD_COMMENT_FAILED',
                        message: '评论失败',
                    } 
                  }
            }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'ADD_COMMENT_FAILED',
                message: '评论失败',
            }
            return 
        }
    }
    async deleteComment(ctx, next){
        const {id,userId} = ctx.request.body
        try{
            const result = await AdminModel.findOne({_id: userId})
            if(result&&result.status == 1){
                await CommentModel.findByIdAndRemove({_id: id})
                ctx.body = {
                    status: 1,
                    type: 'DELETE_COMMENT_FAILED',
                    message: '评论删除成功',
                }
            }else{
                const doc =await CommentModel.findById({_id: id}).populate('author')
                if(doc.author._id == userId){
                    ctx.body = {
                        status: 1,
                        type: 'DELETE_COMMENT_FAILED',
                        message: '评论删除成功',
                    }
                }else{
                    ctx.body = {
                        status: 0,
                        type: 'DELETE_COMMENT_FAILED',
                        message: '无删除权限',
                    }
                }
            }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'DELETE_COMMENT_FAILED',
                message: '评论删除失败',
            }
            return 
        }
    }
    async editComment(ctx, next){
        let params = ctx.request.body
        params.updateDate = this.formatDate()
        try{
            const result = await new CommentModel(params).save()
            ctx.body = {
                status: result?1:0,
                type: result?'EDIT_COMMENT_SUCCESS':'EDIT_COMMENT_FAILED',
                message: result?'评论成功':'评论失败',
            }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'ADD_COMMENT_FAILED',
                message: '评论失败',
            }
            return 
        }
    }
    async webQueryComment(ctx, next){
        const {article} = ctx.query
        try{
            const result = await CommentModel.find({article,status: 1}).populate('article').populate('author').populate('replyComment').populate('replyUser')
                ctx.body = {
                    status: 1,
                    data: result ? result : [],
                    type: 'query_COMMENT_FAILED',
                    message: '查询成功',
                }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'ADD_COMMENT_FAILED',
                message: '评论失败',
            }
            return 
        }
    }
    async adminQueryComment(ctx, next){
        const {pageSize,pageNo} = ctx.query
        let params = ctx.query
        delete params.pageSize
        delete params.pageNo
        try{
            let size = pageSize * 1 || 10
            let num = pageNo * 1 - 1 || 0
            let result = await CommentModel.find(params)
            if(result){
                let curComment = await ArticleModel.find(params).populate('article').populate('author').populate('replyComment').populate('replyUser').skip(num * size).limit(size).sort({ '_id': -1 })
                ctx.body = {
                    status: 1,
                    type: 'QUERY_COMMENT_Finsihed',
                    message: '查询成功',
                    data: curComment ? curComment: []
                }
            }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'ADD_COMMENT_FAILED',
                message: '评论失败',
            }
            return 
        }
    }
    async queryCommentById(ctx, next){
        const {id} = ctx.query
        try{
            const result = await CommentModel.findById({_id: id})
            ctx.body = {
                status: 1,
                data: result ? result : {},
                type: 'query_COMMENT_Single_FAILED',
                message: '查询成功',
            }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'ADD_COMMENT_FAILED',
                message: '评论失败',
            }
            return 
        }
    }
}

export default new Comment()