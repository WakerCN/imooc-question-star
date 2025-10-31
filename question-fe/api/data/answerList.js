import Mock from 'mockjs';
const { Random, mock } = Mock;

export const genQuestionDetailList = (count = 10) => {
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push({
      id: 'answer-' + Random.id(),
      ['qid-name']: Random.cname(),
      ['qid-tel']: mock('@integer(13000000000, 19999999999)'),
      ['qid-gender']: Random.boolean() ? '男' : '女',
      ['qid-technology']: Random.pick(
        ['React', 'Vue', 'Java', 'Python'],
        Random.integer(1, 4)
      )
    });
  }
  return list;
};

export default { genQuestionDetailList };


