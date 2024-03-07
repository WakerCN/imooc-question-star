import { PAGINATION, SEARCH_KEY } from '@/constants';
import { ListParams, QuestionService } from '@/services/question';
import { QuestionDetail, questionSlice } from '@/stores/question';
import { useRequest } from 'ahooks';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from './redux';

export const useQuestionDetail = () => {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const { setDetail } = questionSlice.actions;

  const getQuestionDetail = async () => {
    return QuestionService.getQuestion(id);
  };

  const { loading, error, data } = useRequest(getQuestionDetail, {
    onSuccess: (res) => {
      dispatch(setDetail(res as QuestionDetail));
    }
  });
  return { loading, error, data };
};

export const useQuestionList = (params: ListParams = {}) => {
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get(SEARCH_KEY.KEYWORD) || '';
  const page = parseInt(searchParams.get(SEARCH_KEY.PAGE) || '') || 1;
  const pageSize =
    parseInt(searchParams.get(SEARCH_KEY.SIZE) || '') || PAGINATION.SIZE;

  return useRequest(
    async () => {
      const data = await QuestionService.getQuestionList({
        keyword,
        page,
        pageSize,
        ...params
      });
      return data;
    },
    {
      refreshDeps: [keyword, page, pageSize]
    }
  );
};
