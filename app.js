const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const fs = require('fs')
const jwt = require('koa-jwt')
const cors = require('koa-cors')

const mongoConf = require('./config/mongo')
mongoConf.connect();
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// 开发接口，取消响应html视图
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
//   console.log(`${ctx.url} - ${ms}ms`)
})

//3. 添加jwt认证，同时过滤不需要认证的路由，如获取token
app.use(async(ctx,next)=>{
    let token = ctx.headers.authorization;
    if(token == undefined){
        await next()
    }else{
        let payload = jwt.decode(token.split(' ')[1], jwtSecret);
        ctx.state = {
            data: payload
        }
        await next()
    }
})
app.use(async (ctx,next)=>{
    return next().catch((err)=>{
        if(err.status == 401){
            ctx.status = 401
            ctx.body = {
                status: 401,
                message: 'Protected resource, use Authorization header to get access\n'
            }
        }else{
            throw err
        }
    })
})
app.use(jwt({secret: 'wewewewe45354'}).unless({
    path: ['/api/users/login']
}))

// routes
//2.修改路由的注册方式，通过遍历routes文件夹读取文件
fs.readdirSync('./routes').forEach(route=>{
    let api = require(`./routes/${route}`)
    app.use(api.routes(),api.allowedMethods())
})
// 5.跨域处理
app.use(cors())

//4. 全局错误捕获并响应
app.use(async (ctx,next)=>{
    try{
        await next()
    }catch(err){
        ctx.status = err.statusCode || err.status || 500
        ctx.body = err.message
        ctx.app.emit('error',err,ctx)
    }
})
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
