const Random = require("mockjs").Random;

module.exports = [
  /* 获取 用户信息
  =========================================== */
  {
    url: "/api/user/info",
    method: "get",
    delay: 0,
    response(ctx) {
      if (ctx.header.authorization) {
        return {
          errno: 0,
          data: {
            username: Random.cname()
          },
          msg: "成功"
        };
      } else {
        return {
          errno: 403,
          msg: "获取用户信息失败"
        };
      }
    }
  },
  /* 登录
  =========================================== */
  {
    url: "/api/user/login",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          token: Random.word(20)
        },
        msg: "登录成功"
      };
    }
  },
  /* 注册
  =========================================== */
  {
    url: "/api/user/register",
    method: "post",
    response() {
      return {
        errno: 0,
        msg: "注册成功"
      };
    }
  },
  /* 登录
  =========================================== */
  {
    url: "/api/user/logout",
    method: "post",
    response() {
      return {
        errno: 0,
        msg: "注销成功"
      };
    }
  }
];
