const Mock = require("mockjs");
const Random = Mock.Random;

const getQuestionList = (option = {}) => {
  const { len = 10, isStar, isDeleted = false } = option;
  let list = [];
  for (let i = 0; i < len; i++) {
    list.push({
      _id: Random.id(),
      title: Random.ctitle(),
      isPublished: Random.boolean(),
      isStar:
        isStar === true ? true : isStar === false ? false : Random.boolean(),
      answerCount: Random.natural(50, 300),
      createAt: Random.datetime("yyyy-MM-dd HH:mm"),
      isDeleted
    });
  }
  return list;
};

module.exports = {
  getQuestionList
};
