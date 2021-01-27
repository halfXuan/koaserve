const mongoose = require('mongoose').set('debug', true)
const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}
const url = 'mongodb://localhost:27017/koaBlog'
module.exports = {
    connect: ()=>{
        mongoose.connect(url,options)
        let db = mongoose.connection
        db.on('error',console.error.bind(console,'连接错误'))
        db.once('open',()=>{
            console.log('mongodb connect success')
        })
    }
}