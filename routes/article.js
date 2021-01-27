import Article from '../controller/article'
const router =require('koa-router')()
router.prefix('/api')

router.post('/',Article.add)
module.exports = router