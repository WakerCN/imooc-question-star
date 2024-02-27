const Random = require("mockjs").Random;
const { getQuestionList } = require("../data/questionList");
module.exports = [
  /* 获取问卷详情
  =========================================== */
  {
    url: "/api/question/:id",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
          title: Random.ctitle()
        },
        msg: "成功"
      };
    }
  },
  /* 获取问卷详情 失败
  =========================================== */
  // {
  //   url: "/api/question/:id",
  //   method: "post",
  //   response() {
  //     return {
  //       errno: 10001,
  //       data: null,
  //       msg: "获取详情失败"
  //     };
  //   }
  // },
  /* 创建问卷
  =========================================== */
  {
    url: "/api/question",
    method: "post",
    response() {
      return {
        errno: 0,
        msg: "ok",
        data: {
          id: Random.id(),
          title: Random.ctitle()
        }
      };
    }
  },
  /* 问卷列表
  =========================================== */
  {
    url: "/api/question",
    method: "get",
    response(ctx) {
      const isDeleted = ctx.url.indexOf("isDeleted=true") >= 0;
      const isStar = ctx.url.indexOf("isStar=true") >= 0 ? true : undefined;
      const params = ctx.query || {};
      const pageSize = parseInt(params.pageSize) || 10;

      return {
        errno: 0,
        msg: "ok",
        data: {
          list: getQuestionList({ len: pageSize, isDeleted, isStar }),
          total: 100
        }
      };
    }
  },
  /* 更新 问卷详情
  =========================================== */
  {
    url: "/api/question/:id",
    method: "patch",
    response() {
      return {
        errno: 0,
        msg: "update成功"
      };
    }
  },
  /* 复制 问卷
  =========================================== */
  {
    url: "/api/question/duplicate/:id",
    method: "post",
    response() {
      return {
        errno: 0,
        msg: "复制成功",
        data: {
          id: Random.id()
        }
      };
    }
  },
  /* 彻底删除 问卷
  =========================================== */
  {
    url: "/api/question",
    method: "delete",
    response() {
      return {
        errno: 0,
        msg: "删除成功"
      };
    }
  }
];
