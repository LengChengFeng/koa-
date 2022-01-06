const {
  goodsInfo,
  getAllGoods,
  hasGoodsExists,
  GoodsNumberChange,
  addToCart,
  showShopCart,
  changeGoodsNumber,
  deleteGoods,
  goodsCollect,
  DelGoodsCollect,
  showCollectGoods
} = require("../services/goods-services");
const { removeRepeat } = require("../utils/removeRepeat");
const errorTypes = require("../constants/error-types");
class goodsController {
  //所有的商品
  async AllGoods(ctx) {
    console.log(ctx.req.url);
    const { offset, limit } = ctx.query;
    if (!offset || !limit) {
      return;
    }
    const num = ctx.req.url.indexOf("?");
    const url = ctx.req.url.slice(0, num);
    console.log("url" + url);
    let brand = "";
    if (url === "/phone") {
      brand = "phone";
    } else if (url === "/clothes") {
      brand = "clothes";
    } else if (url === "/doll") {
      brand = "doll";
    }
    console.log(brand);
    try {
      const res = await getAllGoods(brand, offset, limit);
      ctx.body = res;
    } catch (e) {
      console.log(e);
    }
  }
  //商品的详情
  async goodsInfo(ctx) {
    const { goodsId } = ctx.params;
    try {
      const result = await goodsInfo(goodsId);
      ctx.body = result;
      const imgs = [];
      for (const item of result) {
        imgs.push(item.goodsImg.id);
        console.log(imgs);
        item.goodsImg = imgs;
      }
      const res = removeRepeat(result);
      ctx.body = res;
    } catch (e) {
      console.log(e);
    }
  }
  //添加到购物车
  async addToCart(ctx) {
    const { goodsId } = ctx.request.body;
    if (!goodsId) {
      const error = new Error(errorTypes.PARAMS_ARE_EMPTY);
      ctx.app.emit("error", "error", ctx);
      return;
    }
    const { id } = ctx.user;
    console.log("goodsId" + goodsId);
    //查找有没有该商品
    const goods = await hasGoodsExists(id, goodsId);
    let count = 1;
    if (goods === undefined) {
      count = 1;
      await addToCart(id, goodsId, count);
    } else {
      count = ++goods.count;
      await GoodsNumberChange(id, goodsId, count);
    }
    ctx.body = {
      status: 200,
      message: "加入购物车成功~",
    };
  }
  //查看购物车
  async showShopCart(ctx) {
    const { id } = ctx.user;
    const goods = await showShopCart(id);
    const allGoods = [];
    goods.forEach((item) => {
      allGoods.push(item.shopCart);
      item.shopCart = allGoods;
    });
    const newGoods = removeRepeat(goods);
    ctx.body = newGoods;
  }

  //购物车数量的变化
  async changeGoodsNumber(ctx) {
    console.log("我是变暖");
    const { id } = ctx.user;
    const { type, goodsId } = ctx.request.body;
    const res = await hasGoodsExists(id, goodsId);
    let count = res.count;
    console.log(count);
    if (type === "add") {
      ++count;
    } else if (type === "sub") {
      --count;
    }
    await changeGoodsNumber(id, goodsId, count);
    ctx.body = {
      count,
      status: 200,
    };
  }

  //删除购物车
  async deleteShopCart(ctx) {
    const { id } = ctx.user;
    const { goodsId } = ctx.request.body;
    await deleteGoods(id, goodsId);
    ctx.body = "删除成功";
  }

  //商品收藏
  async goodsCollect(ctx) {
    const { id } = ctx.user;
    const { goodsId,type } = ctx.request.body;
    console.log(type);
    if(type === 'collect') {
      console.log('收藏');
      const res = await goodsCollect(id, goodsId);
      ctx.body = res;
    }else if(type === 'remove') {
      console.log('删除');
      console.log(id,goodsId);
      DelGoodsCollect(id,goodsId);
      ctx.body = {
        message:"删除成功~"
      }
    }


  }


  //查看收藏的所有商品
  async showCollectGoods(ctx) {
    const {id} = ctx.user;
    const result = await showCollectGoods(id)
    ctx.body = result;
  }
}
module.exports = new goodsController();
