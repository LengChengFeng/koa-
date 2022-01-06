const fs = require('fs')
const useRoutes = (app)=> {
    fs.readdirSync(__dirname,{withFileTypes:true}).forEach(item=>{
        if(item.name === 'index.js' || item.isDirectory()) {
            return
        }else{
            const router = require(`./${item.name}`)
            app.use(router.routes())
            app.use(router.allowedMethods())
        }
    })
}
module.exports = useRoutes