/*
 * @Author       : 魏威
 * @Date         : 2024-04-15 10:29
 * @LastEditTime : 2024-04-22 15:36
 * @LastEditors  : starone
 * @Description  : 问卷详细list
 */

const mockjs = require("mockjs");
const { Random, mock } = mockjs;

const genQuestionDetailList = (count = 10) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      id: "answer-" + Random.id(),
      ["qid-name"]: Random.cname(),
      ["qid-tel"]: mock("@integer(13000000000, 19999999999)"),
      ["qid-gender"]: Random.boolean() ? "男" : "女",
      ["qid-technology"]: Random.pick(
        ["React", "Vue", "Java", "Python"],
        Random.integer(1, 4)
      )
    });
  }
  return list;
};

module.exports = {
  genQuestionDetailList
};
