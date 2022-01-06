const {
  getUserInfoByName,
  verifyPassword,
} = require("../services/user-services");
const config = require("../constants/error-types");
const typeErrors = require("../constants/error-types");
const md5Password = require("../utils/handlePassword");
//判断用户名是否存在
const verifyUserInfo = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  //用户名或者密码为空的情况下
  if (!username || !password) {
    const error = new Error(config.USERNAME_OR_PASSWORD_IS_EMPTY);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户名是否存在
  try {
    const result = await getUserInfoByName(username);
    // 用户名不存在的情况下
    if (!result.length) {
      console.log("用户名验证成功~");
      await next();
    } else {
      console.log("用户名验证失败~");
      return (ctx.body = { status: 401, msg: "用户名已经存在~" });
    }
  } catch (e) {
    console.log(e);
  }
};

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log(username, password);
  //用户名或者密码为空的情况下
  if (!username || !password) {
    const error = new Error(config.USERNAME_OR_PASSWORD_IS_EMPTY);
    return ctx.app.emit("error", error, ctx);
  }
  //判断用户名是否存在
  try {
    const result = await getUserInfoByName(username);
    // 用户名不存在的情况下
    if (!result.length) {
      console.log("用户名不存在~");
      const error = new Error(config.USERNAME_IS_NOT_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }
    const user = result[0];
    ctx.user = user;
    //判断密码是否正确
    if (md5Password(password) !== user.password) {
      const error = new Error(typeErrors.PASSWORD_IS_ERROR);
      return ctx.app.emit("error", error, ctx);
    }

    await next();
  } catch (e) {
    console.log(e);
    return;
  }
};

const verifyUpdate = async (ctx, next) => {
  //判断密码
  const { password, newPwd, rePwd } = ctx.request.body;
  if (!password || !newPwd || !rePwd) {
    const error = new Error(typeErrors.PARAMS_ARE_EMPTY);
    return ctx.app.emit("error", error, ctx);
  }
  const res = await verifyPassword(md5Password(password));
  if (!res.length) {
    const error = new Error(config.PASSWORD_IS_ERROR);
    return ctx.app.emit("error", error, ctx);
  }
  //密码加密
  ctx.request.body.password = md5Password(password);
  ctx.request.body.newPwd = md5Password(ctx.request.body.newPwd);
  ctx.request.body.rePwd = md5Password(ctx.request.body.rePwd);
  if (newPwd !== rePwd) {
    const error = new Error(config.TWICE_PASSWORD_ARE_DIFFERENCE);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};
//对密码进行加密
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  console.log(ctx.request.body.password);
  await next();
};

module.exports = { verifyUserInfo, verifyLogin, handlePassword, verifyUpdate };
