const Random = require("mockjs").Random;
const { getQuestionList } = require("../data/questionList");

module.exports = [
  /* 获取问卷详情
  =========================================== */
  {
    url: "/api/question/:id",
    method: "post",
    response(ctx) {
      const id = ctx.params.id;
      return {
        errno: 0,
        data: {
          id,
          title: Random.ctitle(),
          widgetList: [
            {
              fe_id: Random.id(),
              baseType: "title",
              title: "主标题",
              isHidden: false,
              isLocked: false,
              props: {
                title: "问卷调查",
                level: 1,
                alignCenter: true
              }
            },
            {
              fe_id: Random.id(),
              baseType: "paragraph",
              title: "说明",
              isHidden: false,
              isLocked: false,
              props: {
                text: "员工基本信息调查问卷\n发布者: 星一",
                isCenter: true
              }
            },
            {
              fe_id: 'qid-name',
              baseType: "input",
              title: "姓名",
              isHidden: false,
              isLocked: false,
              props: {
                title: "您的姓名",
                placeholder: "请输入姓名"
              }
            },
            {
              fe_id: 'qid-tel',
              baseType: "input",
              title: "电话",
              isHidden: false,
              isLocked: false,
              props: {
                title: "您的电话",
                placeholder: "请输入电话"
              }
            },
            {
              fe_id: 'qid-gender',
              baseType: "radio",
              title: "性别",
              isHidden: false,
              isLocked: false,
              props: {
                title: "您的性别",
                list: [
                  { label: "男♂", value: "男♂" },
                  { label: "女♀", value: "女♀" }
                ],
                defaultValue: null,
                isVertical: false
              }
            },
            {
              fe_id: 'qid-technology',
              baseType: "checkbox",
              title: "技术栈",
              isHidden: false,
              isLocked: false,
              props: {
                title: "您的技术栈",
                list: [
                  { label: "React", value: "React", checked: false },
                  { label: "Vue", value: "Vue", checked: false },
                  { label: "Java", value: "Java", checked: false },
                  { label: "Python", value: "Python", checked: false }
                ],
                defaultValue: null,
                isVertical: false
              }
            }
          ]
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
