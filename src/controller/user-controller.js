const jwt = require("jsonwebtoken");
const fs = require("fs");

const errorTypes = require("../constants/error-types");

const {
  saveUserInfo,
  setPassword,
  userInfo,
  changeUsername,
  changeSex,
  changeAddress,
  changeUserAge
} = require("../services/user-services");
const { getAvatarByUserId } = require("../services/file-services");
const { PRIVATE_KEY } = require("../app/config");
const { AVATAR_PATH } = require("../constants/file-path");
const { removeRepeat } = require("../utils/removeRepeat");

class userController {
  //用户注册
  async saveUserInfo(ctx) {
    const { username, password } = ctx.request.body;
    try {
      await saveUserInfo(username, password);
      ctx.body = {
        status: 200,
        msg: "用户注册成功~",
      };
    } catch (e) {
      console.log(e);
    }
  }

  //用户登录
  async userLogin(ctx) {
    const { id, username } = ctx.user;
    console.log(id,username);
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 24 * 60 * 60,
    });
    ctx.body = {
      id,
      username,
      token,
      status: 200,
    };
  }

  //修改密码
  async updatePassword(ctx) {
    try {
      const { newPwd } = ctx.request.body;
      const result = await setPassword(ctx.request.body.password, newPwd);
      ctx.body = {
        status: 200,
        message: "修改密码成功~",
      };
    } catch (e) {
      console.log(e);
    }
  }

  //用户信息
  async userInfo(ctx) {
    const { userId } = ctx.params;
    try {
      const result = await userInfo(userId);
      const allCollect = []
      result.forEach(item=>{
        allCollect.push(item.collect)
        item.collect = allCollect
      })
      console.log(result);
      const res =  removeRepeat(result)
      ctx.body = res;
    } catch (e) {
      console.log(e);
    }
  }

  //用户头像
  async avatarInfo(ctx) {
    const { userId } = ctx.params;
    console.log(userId);
    try {
      //拿到头像的地址
      const avatarInfo = await getAvatarByUserId(userId);
      // 2.提供图像信息
      console.log(avatarInfo);
      ctx.response.set("content-type", avatarInfo.mimetype);
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    } catch (e) {
      console.log(e);
    }
  }

  //更改用户名
  async updateUsername(ctx) {
    const { userId } = ctx.params;
    const { username } = ctx.request.body;
    if (!username) {
      const error = new Error(errorTypes.PARAMS_ARE_EMPTY);
      ctx.app.emit("error", error, ctx);
    }
    try {
      await changeUsername(userId, username);
      ctx.body = {
        status: 200,
        message: "修改用户名成功~",
      };
    } catch (e) {
      console.log(e);
    }
  }

  //更改性别
  async updateUserSex(ctx) {
    const { sex } = ctx.request.body;
    const { id } = ctx.user;
    if (!sex) {
      const error = new Error(errorTypes.PARAMS_ARE_EMPTY);
      ctx.app.emit("error", error, ctx);
    }
    await changeSex(id, sex);
    ctx.body = {
      message: "修改信息成功~",
      status: 200,
    };
  }

  //更改地区
  async updateUserAddress(ctx) {
    const { address } = ctx.request.body;
    const { id } = ctx.user;
    if (!address) {
      const error = new Error(errorTypes.PARAMS_ARE_EMPTY);
      ctx.app.emit("error", error, ctx);
    }
    await changeAddress(id, address);
    ctx.body = {
      message: "修改信息成功~",
      status: 200,
    };
  }

  //年龄
  async updateUserAge(ctx) {
    const { age } = ctx.request.body;
    const { id } = ctx.user;
    console.log(ctx.request.body);
    if (!age) {
      const error = new Error(errorTypes.PARAMS_ARE_EMPTY);
      ctx.app.emit("error", error, ctx);
    }
    await changeUserAge(id,age)
    ctx.body = {
      message: "修改信息成功~",
      status: 200,
    };
  }
}

module.exports = new userController();
