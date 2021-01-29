const AdminModel = require('../../models/admin')
import Util from '../../prototype'
const jwt = require('jwt-simple')
const jwtSecret = 'wewewewe45354'
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 3
class Admin extends Util {
    constructor(){
        super()
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }
   
    setToken(name){
        let payload = {
            exp:Date.now() + tokenExpiresTime,
            name:name
        }
        let token = jwt.encode(payload, jwtSecret)
        return token
    }
    async register(ctx, next){
        const { username, password } = ctx.request.body
        try{
            if(!username){
                throw new  Error('用户名错误')
            }else if(!password){
                throw new  Error('密码错误')
            }
        }catch(err){
            ctx.body = {
                    status: 0,
                    type: 'GET_ERROR_PARAMS',
                    message: err.message
            }
            return
        }

        try{
            const admins = await AdminModel.findOne({username})
            if(admins){
                ctx.body = {
                        status: 0,
                        type: 'USER_HAS_EXIST',
                        message: '用户已注册'
                }
            }else{
              
               let admin = ctx.request.body
               admin.createDate =  this.formatDate()   
               if(username === '18727994495'){
                   admin.status = 1
               }
             const a =  await new AdminModel(admin).save()
               ctx.body = {
                        status: 1,
                        type: 'REGISTER_SUCCESSED',
                        message: '管理员注册成功'
                }
                return
            }
        }catch(err){
            ctx.body = {
                    status: 0,
                    type: 'REGISTER_ADMIN_FAILED',
                    message: '管理员注册失败'
            }
        }
    }
    async login(ctx, next){
        console.log(22);
        const { username, password } = ctx.request.body
        try{
            if(!username){
                throw new  Error('用户名错误')
            }else if(!password){
                throw new  Error('密码错误')
            }
        }catch(err){
            ctx.body = {
                    status: 0,
                    type: 'GET_ERROR_PARAMS',
                    message: err.message
            }
            return
        }

        try{
            const admin =await AdminModel.findOne({username})
           
            if(!admin){
                ctx.body = {
                        status: 0,
                        type: 'USER_NOT_EXIST',
                        message: '用户名不存在'
                }
            }else{
                if(admin.password == password){
                    admin.token = this.setToken(admin.username)
                  const newAdmin =  await new AdminModel(admin).save()
                    ctx.body = {
                        status: 1,
                        data: newAdmin,
                        type: 'USER_LOGIN_SUCCESS',
                        message: '登录成功'
                    }
                }else{
                    ctx.body = {
                        status: 0,
                        type: 'USER_PASSWORD_ERROR',
                        message: '密码错误'
                    }
                }
            }
        }catch(err){
            ctx.body = {
                    status: 0,
                    type: 'LOGIN_ADMIN_FAILED',
                    message: err.message
            }
            return
        }
    }
}

export default new Admin()