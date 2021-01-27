import {Article as ArticleModel} from '../../models/article'

class Article {
    constructor(){

    }
    async query(ctx, next){
        ctx.body = await Users.find()
    }
}

export default new Article()