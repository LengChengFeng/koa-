const Router = require("koa-router")

const GoodsRouter = new Router() 
const { ImagesInfo } = require("../controller/file-controller")

const {goodsInfo,AllGoods,addToCart,showShopCart,changeGoodsNumber,deleteShopCart,
       goodsCollect,showCollectGoods } = require("../controller/goods-controller")
const verifyAuth = require('../middleware/verifyAuth-middleware')

//拿到所有的商品
GoodsRouter.get('/phone',AllGoods)
GoodsRouter.get('/clothes',AllGoods)
GoodsRouter.get('/doll',AllGoods)
//拿到商品的详细数据
GoodsRouter.get('/goods/:goodsId',goodsInfo)


//加入购物车
GoodsRouter.post('/shopCart',verifyAuth,addToCart)
//查看购物车
GoodsRouter.get('/shopCart',verifyAuth,showShopCart)
//购物车的数量
GoodsRouter.patch('/shopCart',verifyAuth,changeGoodsNumber)
//删除购物车
GoodsRouter.delete('/shopCart',verifyAuth,deleteShopCart)

//查看用户收藏的商品
GoodsRouter.get('/goodsCollect',verifyAuth,showCollectGoods)

//商品的收藏
GoodsRouter.post('/goodsCollect',verifyAuth,goodsCollect)


//商品图片
GoodsRouter.get("/images/:filename",ImagesInfo)

module.exports = GoodsRouter