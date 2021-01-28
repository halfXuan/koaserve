import Article from '../controller/article'
const router =require('koa-router')()
router.prefix('/api/article')

router.post('/addArticle',Article.addArticle)
router.post('/deleteArticle',Article.deleteArticle)
router.post('/editArticle',Article.editArticle)
router.post('/changeArticleStatus',Article.changeArticleStatus)
router.get('/webQueryArticle',Article.webQueryArticle)
router.get('/adminQueryArticle',Article.adminQueryArticle)
router.get('/queryArticleById',Article.queryArticleById)

module.exports = router