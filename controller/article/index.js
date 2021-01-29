const ArticleModel = require('../../models/article')
import Util from '../../prototype'
class Article extends Util {
    constructor(){
        super()
        this.addArticle = this.addArticle.bind(this)
        this.editArticle = this.editArticle.bind(this)
        this.changeArticleStatus = this.changeArticleStatus.bind(this)
    }
    async webQueryArticle(ctx, next){
        const {pageSize,pageNo} = ctx.query
        let params = ctx.query
        params.status = 1
        delete params.pageSize
        delete params.pageNo
        try{
            let size = pageSize * 1 || 10
            let num = pageNo * 1 - 1 || 0
            let article = await ArticleModel.find(params)
            if(article){
                let curArt = await ArticleModel.find(params).skip(num * size).limit(size).sort({ '_id': -1 })
                ctx.body = {
                    status: 1,
                    type: 'QUERY_ARTICLE_Finsihed',
                    message: '查询成功',
                    data: curArt ? curArt: []
                }
            }else{
                ctx.body = {
                    status: 1,
                    data: [],
                    type: 'QUERY_ARTICLE_NULL',
                    message: '查询成功',
                } 
            }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'QUERY_ARTICLE_FAILED',
                message: '查询失败',
            }
            return 
        }
        const datas = await ArticleModel.find()
        ctx.body = {
            data: datas ? datas: []
        }
    }
    async adminQueryArticle(ctx, next){
        const {pageSize,pageNo} = ctx.query
        let params = ctx.query
        delete params.pageSize
        delete params.pageNo
        try{
            let size = pageSize * 1 || 10
            let num = pageNo * 1 - 1 || 0
            let article = await ArticleModel.find(params)
            if(article){
                let curArt = await ArticleModel.find(params).skip(num * size).limit(size).sort({ '_id': -1 })
                ctx.body = {
                    status: 1,
                    type: 'QUERY_ARTICLE_Finsihed',
                    message: '查询成功',
                    data: curArt ? curArt: []
                }
            }else{
                ctx.body = {
                    status: 1,
                    data: [],
                    type: 'QUERY_ARTICLE_NULL',
                    message: '查询成功',
                } 
            }
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'QUERY_ARTICLE_FAILED',
                message: '查询失败',
            }
            return 
        }
    }
    async queryArticleById(){
        const {id} = ctx.query
        try{
            const detail = await ArticleModel.findById({_id: id})
            await ArticleModel.findByIdAndUpdate({ _id: id }, { $inc: { browse: 1 } }, { multi: false })
            ctx.body = {
                status: 1,
                data: detail?detail:{},
                type: 'QUERY_ARTICLE_NULL',
                message: '查询成功',
            } 
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'QUERY_ARTICLEBYID_FAILED',
                message: '查询失败',
            }
            return 
        }
    }
    async addArticle(ctx, next){
        const params = ctx.request.body
        params.createDate = this.formatDate()
        try{
            await new ArticleModel(params).save()
            ctx.body = {
                status: 1,
                type: 'ADD_ARTICLE_SUCCESS',
                message: '添加成功',
            } 
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'QUERY_ARTICLEBYID_FAILED',
                message: '查询失败',
            }
            return 
        }
    }
    async editArticle(ctx, next){
        const params = ctx.request.body
        params.updateDate = this.formatDate()
        try{
            await new ArticleModel(params).save()
            ctx.body = {
                status: 1,
                type: 'ADD_ARTICLE_SUCCESS',
                message: '修改成功',
            } 
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'UPDATE_ARTICLE_FAILED',
                message: '查询失败',
            }
            return 
        }
    }
    async changeArticleStatus(ctx, next){
        const {id, status} = ctx.request.body
        try{
            await ArticleModel.findByIdAndUpdate({_id: id},{status, updateDate: this.formatDate()})
            ctx.body = {
                status: 1,
                type: 'ADD_ARTICLE_SUCCESS',
                message: '修改成功',
            } 
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'UPDATE_ARTICLE_FAILED',
                message: '查询失败',
            }
            return 
        }
    }
    async deleteArticle(ctx, next){
        const {id} = ctx.request.body
        try{
            await ArticleModel.findByIdAndRemove({_id: id})
            ctx.body = {
                status: 1,
                type: 'ADD_ARTICLE_SUCCESS',
                message: '删除成功',
            } 
        }catch(err){
            ctx.body = {
                status: 0,
                type: 'UPDATE_ARTICLE_FAILED',
                message: '查询失败',
            }
            return 
        }
    }
}

export default new Article()