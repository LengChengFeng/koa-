const config = require("../constants/error-types");
const errorHandler = (error, ctx, next) => {
  let message;
  let status;
  switch (error.message) {
    case config.USERNAME_OR_PASSWORD_IS_EMPTY:
      ctx.body = {
        message: "用户名或者密码不能为空~",
        status: 401,
      };
      break;

    case config.USERNAME_IS_NOT_EXISTS:
      ctx.body = {
        message: "用户名不存在~",
        status: 401,
      };
      break;

    case config.PASSWORD_IS_ERROR:
      ctx.body = {
        message: "密码错误~",
        status: 401,
      };
      break;

    case config.UN_AUTHORIZATION:
      ctx.body = {
        message: "未授权~",
        status: 401,
      };
      break;

    case config.TWICE_PASSWORD_ARE_DIFFERENCE:
      ctx.body = {
        message: "两次输入的密码不一致~",
        status: 401,
      };
      break;

    case config.PARAMS_ARE_EMPTY:
      (message = "两次输入的密码不一致~"), (status = 401);
      break;
    default:
      break;
  }
};
module.exports = errorHandler;
