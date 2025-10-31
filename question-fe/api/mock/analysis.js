import Mock from 'mockjs';
const { Random } = Mock;
import { genQuestionDetailList } from '../data/answerList.js';

export default [
  {
    url: '/api/question/analysis/:id',
    method: 'get',
    response(ctx) {
      const id = ctx.params.id;
      return {
        errno: 0,
        data: {
          total: 100,
          list: []
        },
        msg: '成功'
      };
    }
  },
  {
    url: '/api/question/analysis/answer/:id',
    method: 'get',
    response(ctx) {
      const id = ctx.params.id;

      return {
        errno: 0,
        data: {
          total: 100,
          list: genQuestionDetailList(100)
        },
        msg: '成功'
      };
    }
  },
  {
    url: '/api/question/analysis/details/:id',
    method: 'get',
    response(ctx) {
      const id = ctx.params.id;
      return {
        errno: 0,
        data: {
          id
        },
        msg: '成功'
      };
    }
  }
];


