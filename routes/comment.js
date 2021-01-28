import Comment  from '../controller/comment'

const router = require('koa-router')()

router.prefix('/api/comment')

router.post('/addComment', Comment.addComment)
router.post('/deleteComment', Comment.deleteComment)
router.post('/editComment', Comment.editComment)
router.get('/webQueryComment', Comment.webQueryComment)
router.get('/adminQueryComment', Comment.adminQueryComment)
router.get('/queryCommentById', Comment.queryCommentById)

module.exports = router
