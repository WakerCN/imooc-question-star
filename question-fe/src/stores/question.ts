/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 16:59
 * @LastEditTime : 2024-03-11 15:09
 * @LastEditors  : Waker
 * @Description  :
 */
import { WidgetInfo, WidgetProps } from '@/widgets';
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
  rightPaneActiveKey: string;
}

export const editInitialState: QuestionEditorState = {
  id: '',
  title: '',
  widgetList: [],
  selectedId: null,
  rightPaneActiveKey: 'settings'
};

export const questionSlice = createSlice({
  name: 'question',
  initialState: editInitialState,
  reducers: {
    setDetail: (_, action: PayloadAction<QuestionEditorState>) => {
      return action.payload;
    },
    setSelectedId: produce(
      (draft: QuestionEditorState, action: PayloadAction<string | null>) => {
        const id = action.payload;
        draft.selectedId = id;
        draft.rightPaneActiveKey = id ? 'attributes' : 'settings';
      }
    ),
    addWidget: produce(
      (draft: QuestionEditorState, action: PayloadAction<WidgetInfo>) => {
        /** 如果有选中组件添加到选中组件的后面，如果没有添加到列表结尾 */
        if (draft.selectedId) {
          const index = draft.widgetList.findIndex(
            (item) => item.fe_id === draft.selectedId
          );
          draft.widgetList.splice(index + 1, 0, action.payload);
        } else {
          draft.widgetList.push(action.payload);
        }
      }
    ),
    setRightPaneActiveKey: produce(
      (
        draft: QuestionEditorState,
        action: PayloadAction<QuestionEditorState['rightPaneActiveKey']>
      ) => {
        draft.rightPaneActiveKey = action.payload;
      }
    ),
    updateProps: produce(
      (
        draft: QuestionEditorState,
        action: PayloadAction<{ id: string; props: WidgetProps }>
      ) => {
        const { id, props } = action.payload;
        const curComp = draft.widgetList.find((w) => w.fe_id === id);
        if (curComp) {
          curComp.props = { ...curComp.props, ...props };
        }
      }
    )
  }
});
