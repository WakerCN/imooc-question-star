/*
 * @Author       : 魏威
 * @Date         : 2024-04-11 11:06
 * @LastEditTime : 2024-04-22 15:30
 * @LastEditors  : starone
 * @Description  : 获取分析页信息
 */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';
import { QuestionDetails } from './question';

interface AnswerDetail {
  /** 答卷id */
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface AnalysisState extends QuestionDetails {
  selectedId: string | null;
  answerList: AnswerDetail[];
}

const initialState: AnalysisState = {
  id: '',
  title: '',
  widgetList: [],
  answerList: [],
  selectedId: null
};

export const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    updateState: (
      state: AnalysisState,
      action: PayloadAction<Partial<AnalysisState>>
    ) => {
      const { payload } = action;
      return { ...state, ...payload };
    },
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
