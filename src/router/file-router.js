const Router = require("koa-router");
const verifyAuth = require("../middleware/verifyAuth-middleware");

const { avatarHandle,imagesHandle } = require("../middleware/file-middleware.js");
const {saveAvatarInfo,saveImagesInfo} = require("../controller/file-controller")
const fileRouter = new Router();

fileRouter.post("/upload/avatar", verifyAuth, avatarHandle,saveAvatarInfo);
fileRouter.post("/upload/images/:goodsId",verifyAuth, imagesHandle, saveImagesInfo)

module.exports = fileRouter;
