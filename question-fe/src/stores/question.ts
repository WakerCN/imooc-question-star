import { WidgetInfo } from '@/widgets';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';

export interface QuestionInfo {
  id: string;
  title: string;
}

export interface QuestionDetails extends QuestionInfo {
  widgetList: WidgetInfo[];
}

export interface QuestionEditorState extends QuestionDetails {
  selectedId: string | null;
}

const initialState: QuestionEditorState = {
  id: '',
  title: '',
  selectedId: null,
  widgetList: []
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setDetail: (_, action: PayloadAction<QuestionEditorState>) => {
      return action.payload;
    },
    setSelectedId: produce(
      (draft: QuestionEditorState, action: PayloadAction<string | null>) => {
        draft.selectedId = action.payload;
      }
    )
  }
});
