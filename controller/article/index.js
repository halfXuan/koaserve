 const ArticleModel = require('../../models/article')

class Article {
    constructor(){

    }
    async query(ctx, next){
        const datas = await ArticleModel.find()
        ctx.body = {
            data: datas ? datas: []
        }
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