const connections = require("../app/database");
class goodsService {
  //查找名字
  async getImagesByName(filename) {
    const statement = `select * from goodsImg where filename = ? `;
    const [result] = await connections.execute(statement, [filename]);
    return result[0];
  }

  //所有的商品
  async getAllGoods(brand, offset, limit) {
    console.log(brand);
    console.log(offset, limit);
    const statement = `select * from allGoods where brand = ? limit ?,?`;
    const [result] = await connections.execute(statement, [
      brand,
      offset,
      limit,
    ]);
    return result;
  }

  //查找某个商品的详细信息
  async goodsInfo(goodsId) {
    const statement = `
        SELECT 
        goods.id Id,
        goods.name name,
        goods.desc goodsDesc,
        goods.price price,
        goods.score score,
        goods.sell sell,
        JSON_OBJECT('id',goodsImg.goods_url)  as goodsImg
        from goods left JOIN goodsImg on goodsImg.goods_id = goods.id
        where goodsimg.goods_id = ?`;
    const [result] = await connections.execute(statement, [goodsId]);
    return result;
  }

  //加入购物车
  async addToCart(userId, goodsId, count) {
    const statement = `insert into shopCart (user_id,goods_id,count) values (?,?,?)`;
    const [result] = await connections.execute(statement, [
      userId,
      goodsId,
      count,
    ]);
    return result;
  }

  //查找商品是否已经存在
  async hasGoodsExists(userId, goodsId) {
    console.log(userId,goodsId);
    const statement = `select * from shopCart where user_id = ? and goods_id = ? `;
    const [result] = await connections.execute(statement, [userId, goodsId]);
    console.log(result);
    return result[0];
  }

  //商品数量变化
  async GoodsNumberChange(userId, goodsId, count) {
    const statement = `update shopCart set count = ? where user_id = ? and goods_id = ? `;
    const [result] = await connections.execute(statement, [
      count,
      userId,
      goodsId,
    ]);
    return result;
  }

  //查看购物车
  async showShopCart(userId) {
    const statement = `
        select 
        userInfo.id username,userInfo.user_avatar userAvatar,
        JSON_OBJECT('goodsId',allgoods.id,
        'title',allgoods.title,'price',allgoods.price,'img',allgoods.img,'goodsDesc',allgoods.desc,'count',shopcart.count) as shopCart
        from userInfo left join shopCart
        on userInfo.id = shopCart.user_id
        left join allgoods
        on allgoods.id = shopCart.goods_id
        where userInfo.id = ?
        `;
    const [result] = await connections.execute(statement, [userId])
    return result;
  }


  //购物车数量的变化
  async changeGoodsNumber(userId,goodsId,count) {
    console.log(count);
    const statement = `update shopCart set count = ? where user_id = ? and goods_id = ?`
    const [result] = await connections.execute(statement, [count,userId,goodsId])
    return result;
  }

  //删除购物车
  async deleteGoods(userId,goodsId) {
    const statement = `delete from shopCart where user_id = ? and goods_id = ?`
    const [result] = await connections.execute(statement,[userId,goodsId])
    return result;
  }

  //商品收藏
  async goodsCollect(userId,goodsId) {
    console.log(userId,goodsId);
    const statement = `insert into collect (user_id,goods_id) values(?,?)`
    const [result] = await connections.execute(statement,[userId,goodsId])
    return result;
  }

  //删除收藏的商品
  async DelGoodsCollect(userId,goodsId) {
    const statement = `delete from collect where user_id = ? and  goods_id = ? `
    const [result] = await connections.execute(statement,[userId,goodsId])
    console.log(result);
    return result;
  }

  //查看收藏的商品
  async showCollectGoods(userId) {
    console.log(userId);
    const statement = `select 
    JSON_OBJECT('goodsId',allgoods.id,'goodsTitle',allgoods.title,'goodsPrice',allgoods.price,'img',allgoods.img
    ,'goodsDesc',allgoods.desc) as collect
    from userinfo left join collect on userinfo.id  = collect.user_id 
   left join allgoods on collect.goods_id = allgoods.id where userinfo.id = ? `
    const [result] = await connections.execute(statement,[userId])
    return result;
  }
}

module.exports = new goodsService();
