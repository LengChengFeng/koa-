const Router = require("koa-router");

const userUpdateRouter = new Router()

const verifyAuth = require("../middleware/verifyAuth-middleware");
const {updateUsername,updateUserSex,updateUserAddress,updateUserAge} =  require("../controller/user-controller")

userUpdateRouter.patch("/user/:userId",verifyAuth,updateUsername)
userUpdateRouter.patch("/sex/:userId",verifyAuth,updateUserSex)
userUpdateRouter.patch("/address/:userId",verifyAuth,updateUserAddress)
userUpdateRouter.patch("/age/:userId",verifyAuth,updateUserAge)
module.exports = userUpdateRouter