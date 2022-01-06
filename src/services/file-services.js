const connections = require("../app/database");
class fileServices {
  //把头像地址保存到userInfo中
  async saveAvatarUrl(userId, url) {
    console.log(url);
    console.log('www');
    const statement = `update userInfo set user_avatar = ? where id = ? `;
    const [result] = await connections.execute(statement, [url, userId]);
    return result;
  }
  //保存头像信息
  async saveAvatarInfo(id, filename, size, mimetype) {
    console.log(id, filename, size, mimetype);
    const statement = `insert into avatar (user_id,filename,size,mimetype) values (?,?,?,?)`;
    const [result] = await connections.execute(statement, [
      id,
      filename,
      size,
      mimetype,
    ]);
    return result;
  }

  //保存商品图片信息
  async saveGoodsImg(goodsId,filename,size,mimetype,goods_url) {
    const statement = `insert into goodsImg( goods_id,filename, size, mimetype,goods_url) values (?,?,?,?,?)`
    const [result] = await connections.execute(statement,[goodsId,filename, size, mimetype,goods_url])
    return result;
  }


  //拿到头像地址
  async getAvatarByUserId(userId) {
    const statement = `select * from avatar where user_id = ? `;
    const [result] = await connections.execute(statement, [userId]);
    console.log(result);
    return result.pop();
  }
}
module.exports = new fileServices();
