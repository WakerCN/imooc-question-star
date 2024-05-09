/*
 * @Author       : 魏威
 * @Date         : 2024-04-11 11:06
 * @LastEditTime : 2024-04-22 15:27
 * @LastEditors  : starone
 * @Description  : analysis分析页自定义hooks
 */
import { AnalysisService } from '@/services/analysis';
import { AnalysisState, analysisSlice } from '@/stores/analysis';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux';

/** 从服务端获取analysis详情 */
export const useLoadAnalysisDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { updateState } = analysisSlice.actions;
  return useRequest(
    async () => await AnalysisService.getAnalysisData(String(params?.id)),
    {
      onSuccess: (response) => {
        dispatch(updateState({ answerList: response.list }));
      }
    }
  );
};

/** 从redux中获取analysis详情 */
export const useGetAnalysisDetail = () => {
  const analysis = useAppSelector((state) => state.analysis);
  const { selectedId } = analysis;

  const dispatch = useAppDispatch();
  const { setSelectedId } = analysisSlice.actions;

  return {
    analysisDetail: analysis,
    selectedId,
    setSelectedId: (id: AnalysisState['selectedId']) =>
      dispatch(setSelectedId(id))
  };
};
