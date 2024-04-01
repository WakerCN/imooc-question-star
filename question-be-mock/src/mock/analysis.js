/*
 * @Author       : 魏威
 * @Date         : 2024-03-29 16:58
 * @LastEditTime : 2024-03-29 16:59
 * @LastEditors  : Waker
 * @Description  :
 */
const Random = require("mockjs").Random;

module.exports = [
  /* 获取问卷分析详情
  =========================================== */
  {
    url: "/api/question/analysis/:id",
    method: "post",
    response(ctx) {
      const id = ctx.params.id;
      return {
        errno: 0,
        data: {
          canvasData: {
            meta: {
              id,
              title: Random.ctitle()
            },
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
                fe_id: Random.id(),
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
                fe_id: Random.id(),
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
                fe_id: Random.id(),
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
                fe_id: Random.id(),
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
          analysisData: {
            charts: {},
            total: 100,
            list: []
          }
        },
        msg: "成功"
      };
    }
  }
];
