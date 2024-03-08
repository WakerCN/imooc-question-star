import { PAGINATION, SEARCH_KEY } from '@/constants';
import { ListParams, QuestionService } from '@/services/question';
import { QuestionDetails, questionSlice } from '@/stores/question';
import { useRequest } from 'ahooks';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux';

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

/** 从服务端加载 QuestionDetails */
export const useLoadQuestionDetail = () => {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const { setDetail } = questionSlice.actions;

  const getQuestionDetail = async () => {
    return QuestionService.getQuestion(id);
  };

  const { loading, error, data } = useRequest(getQuestionDetail, {
    onSuccess: (res) => {
      const result = res as QuestionDetails;
      const { widgetList } = result;
      let selectedId = null;
      if (widgetList.length) selectedId = widgetList[0].fe_id;
      dispatch(setDetail({ ...result, selectedId }));
    }
  });
  return { loading, error, data };
};

export const useGetQuestionDetail = () => {
  const details = useAppSelector((state) => state.question);

  return { details, ...details };
};
