/*
 * @Author       : 魏威
 * @Date         : 2024-02-27 16:24
 * @LastEditTime : 2024-03-28 15:26
 * @LastEditors  : Waker
 * @Description  :
 */
import { PAGINATION, SEARCH_KEY } from '@/constants';
import { ListParams, QuestionService } from '@/services/question';
import {
  QuestionDetails,
  editInitialState,
  questionSlice
} from '@/stores/question';
import { useRequest } from 'ahooks';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux';
import { ActionCreators } from 'redux-undo';

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
      dispatch(setDetail({ ...editInitialState, ...result, selectedId }));
      dispatch(ActionCreators.clearHistory());
    }
  });
  return { loading, error, data };
};

/** 从redux中获取问卷详细信息 */
export const useGetQuestionDetail = () => {
  const details = useAppSelector((state) => state.question.present);
  const past = useAppSelector((state) => state.question.past);
  const future = useAppSelector((state) => state.question.future);
  const { selectedId, widgetList } = details;

  const selectComponent = widgetList.find((item) => item.fe_id === selectedId);

  return { details, past, future, selectComponent, ...details };
};
