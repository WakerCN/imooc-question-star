import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

export interface AnalysisState {
  selectedId: string | null;
}

const initialState: AnalysisState = {
  selectedId: null
};

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setSelectedId: produce(
      (
        draft: AnalysisState,
        action: PayloadAction<AnalysisState['selectedId']>
      ) => {
        draft.selectedId = action.payload;
      }
    )
  }
});
