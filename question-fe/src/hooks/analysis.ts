import { AnalysisState, analysisSlice } from '@/stores/analysis';
import { useAppDispatch, useAppSelector } from './redux';

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
