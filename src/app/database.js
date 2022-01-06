const mysql = require("mysql2")
const config = require("./config")
const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
    port:config.MYSQL_PORT
})

connections.getConnection((err,conn)=>{
    conn.connect(err=>{
        if(err) {
            console.log(err);
        }else{
            console.log('数据库连接成功~');
        }
    })
})

module.exports = connections.promise()