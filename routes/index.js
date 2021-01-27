import Article  from '../controller/article'
const router = require('koa-router')()
router.prefix('/api')
router.get('/', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/string', Article.query)
router.post('/add', Article.add)

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
