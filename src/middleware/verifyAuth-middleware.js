const jwt = require("jsonwebtoken");

const { PUBLIC_KEY } = require("../app/config");
const errorTypes = require("../constants/error-types");
const verifyAuth = async (ctx, next) => { 
  const authorization = ctx.request.header.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.UN_AUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (e) {
    console.log(e);
    return;
  }
};

module.exports = verifyAuth;
