const connections = require("../app/database");
class userServices {
  //根据用户名查找
  async getUserInfoByName(username) {
    const statement = `select * from userInfo where username = ? `;
    const [result] = await connections.execute(statement, [username]);
    return result;
  }

  //将数据存到数据库
  async saveUserInfo(username, password) {
    const statement = `insert into userInfo(username,password) values (?, ?)`;
    const [result] = await connections.execute(statement, [username, password]);
    return result;
  }

  //重新设置密码
  async setPassword(password, newPwd) {
    const statement = `update userInfo set password = ? where password = ?`;
    const [result] = await connections.execute(statement, [newPwd, password]);
    return result;
  }

  //用户信息
  async userInfo(userId) {
    const statement = `select 
    u.id id,
    u.username username, u.age age,u.sex sex,u.address address,u.signature signature,
    u.introduce introduce,u.user_avatar avatar,
    JSON_OBJECT('goodsId',allgoods.id,'goodsTitle',allgoods.title,'goodsPrice',allgoods.price,'img',allgoods.img,
    'goodsDesc',allgoods.desc) as collect
    from userInfo as u 
    left join collect on u.id = collect.user_id 
    left join allgoods on collect.goods_id = allgoods.id
    where u.id = ? `
    const [result] = await connections.execute(statement, [userId])
    return result;
  }

  //修改用户名
  async changeUsername(userId,username) {
    const statement = `update userInfo set username = ? where id = ? `
    const [ result ] = await connections.execute(statement, [username,userId])
    return result;
  }

  //修改性别
  async changeSex(userId,sex) {
    const statement = `update userInfo set sex = ? where id = ? `
    const [ result ] = await connections.execute(statement, [sex,userId])
    return result;
  }

  //修改地区
  async changeAddress(userId,address) {
    const statement = `update userInfo set address = ? where id = ? `
    const [ result ] = await connections.execute(statement, [address,userId])
    return result;
  }

   //修改年龄
   async changeUserAge(userId,age) {
    const statement = `update userInfo set age = ? where id = ? `
    const [ result ] = await connections.execute(statement, [age,userId])
    return result;
  }
}

module.exports = new userServices();
