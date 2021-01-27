import Admin  from '../controller/admin'

const router = require('koa-router')()

router.prefix('/api/users')

router.post('/register', Admin.register)

router.post('/login', Admin.login)

module.exports = router
