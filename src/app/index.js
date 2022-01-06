const Koa = require("koa");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const useRoutes = require("../router");

const errorHandler = require("./errorHandle");
const app = new Koa();
//配置 cors 的中间件

app.use(bodyParser());
// 实现跨域
app.use(
  cors({
    origin: function (ctx) {
      if (ctx.url === "/test") {
        return "*"; // 允许来自所有域名请求
      }
      return "*";
    },
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "POST", "DELETE","PATCH"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
useRoutes(app);
//监听错误处理
app.on("error", errorHandler);
module.exports = app;
