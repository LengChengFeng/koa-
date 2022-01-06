const config = require('./app/config')
const app = require('./app')
require("./app/database")

app.listen(config.APP_PORT,()=>{
    console.log(`服务器启动${config.APP_PORT}成功`);
})