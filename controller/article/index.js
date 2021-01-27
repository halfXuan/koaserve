const ArticleModel = require('../../models/article')
import Admin from '../admin'
class Article extends Admin {
    constructor(){

    }
    async webQuery(ctx, next){
        const {pageSize,pageNo} = ctx.query
        let params = ctx.query
        params.status = 1
        delete params.pageSize
        delete params.pageNo
        try{
            let size = pageSize * 1 || 10
            let num = pageNo * 1 - 1 || 0
            let article = await Article.find(params)
            if(article){
                let curArt = await Article.find(params).skip(num * size).limit(size).sort({ '_id': -1 })
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
    async adminQuery(ctx, next){
        const {pageSize,pageNo} = ctx.query
        let params = ctx.query
        delete params.pageSize
        delete params.pageNo
        try{
            let size = pageSize * 1 || 10
            let num = pageNo * 1 - 1 || 0
            let article = await Article.find(params)
            if(article){
                let curArt = await Article.find(params).skip(num * size).limit(size).sort({ '_id': -1 })
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
    async queryById(){
        
    }
    async add(ctx, next){
        await new ArticleModel(ctx.request.body).save()
        ctx.body = {
            status: 1,
			message: '添加成功',
        }
    }
}

export default new Article()