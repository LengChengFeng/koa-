const fs = require('fs')
const {
  saveAvatarInfo,
  saveAvatarUrl,
  saveGoodsImg,
} = require("../services/file-services");
const {getImagesByName}  = require("../services/goods-services")
const { APP_PORT, APP_HOST_PORT } = require("../app/config");
const {IMAGE_PATH} = require("../constants/file-path")
class fileController {
  async saveAvatarInfo(ctx) {
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.user;
    //将头像信息储存到数据库
    try {
      await saveAvatarInfo(id, filename, size, mimetype);
      //将用户头像保存到user表中
      const avatar_url = `${APP_HOST_PORT}${APP_PORT}/user/${id}/avatar`;
      await saveAvatarUrl(id, avatar_url);
      ctx.body = {
        status: 200,
        message: "头像上传成功~",
      };
    } catch (err) {
      console.log(err);
    }
  }


  //保存商品图片
  async saveImagesInfo(ctx) {
    const { goodsId } = ctx.params;
    const files = ctx.req.files;
    for (let file of files) {
      const { filename, mimetype, size } = file;
      const goods_url = `${APP_HOST_PORT}${APP_PORT}/images/${filename}`;
      await saveGoodsImg(goodsId, filename, size, mimetype,goods_url);
    }
    ctx.body = "上传成功";
  }

  //查看商品图片
  async ImagesInfo(ctx) {
    const { filename } = ctx.params;
    const fileInfo =  await getImagesByName(filename)
    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${IMAGE_PATH}/${filename}`);
  }
}

module.exports = new fileController();
