/*
 * @Author       : 魏威
 * @Date         : 2024-03-29 16:58
 * @LastEditTime : 2024-04-15 10:56
 * @LastEditors  : starone
 * @Description  :
 */
const Random = require("mockjs").Random;
const { genQuestionDetailList } = require("../data/answerList");

module.exports = [
  /* 获取问卷分析详情
  =========================================== */
  {
    url: "/api/question/analysis/:id",
    method: "get",
    response(ctx) {
      const id = ctx.params.id;
      return {
        errno: 0,
        data: {
          total: 100,
          list: []
        },
        msg: "成功"
      };
    }
  },
  {
    url: "/api/question/analysis/answer/:id",
    method: "get",
    response(ctx) {
      const id = ctx.params.id;

      return {
        errno: 0,
        data: {
          total: 100,
          list: genQuestionDetailList(100)
        },
        msg: "成功"
      };
    }
  }
];
