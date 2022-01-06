const Router = require("koa-router");

const userRouter = new Router();

const {
  verifyUserInfo,
  verifyLogin,
  verifyUpdate,
  handlePassword,
} = require("../middleware/verifyUser-middleware");
const {
  saveUserInfo,
  userLogin,
  updatePassword,
  userInfo,
  avatarInfo,
} = require("../controller/user-controller");
const verifyAuth = require("../middleware/verifyAuth-middleware");
//登录
userRouter.post("/register", verifyUserInfo, handlePassword, saveUserInfo);
//注册
userRouter.post("/login", verifyLogin, userLogin);
//修改密码
userRouter.post("/update", verifyAuth, verifyUpdate, updatePassword);
//获取用户信息
userRouter.get("/user/:userId",verifyAuth,userInfo)
//查看头像
userRouter.get("/user/:userId/avatar", avatarInfo);

module.exports = userRouter;
