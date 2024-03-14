/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 16:59
 * @LastEditTime : 2024-03-13 17:40
 * @LastEditors  : Waker
 * @Description  :
 */
import { notification } from '@/components/AntdStatic';
import { WidgetInfo, WidgetProps } from '@/widgets';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { produce } from 'immer';
import _ from 'lodash';
import { nanoid } from 'nanoid';

export interface QuestionInfo {
  id: string;
  title: string;
}

export interface QuestionDetails extends QuestionInfo {
  widgetList: WidgetInfo[];
}

export interface QuestionEditorState extends QuestionDetails {
  selectedId: string | null;
  copiedWidget: WidgetInfo | null;
  rightPaneActiveKey: string;
}

export const editInitialState: QuestionEditorState = {
  id: '',
  title: '',
  widgetList: [],
  selectedId: null,
  copiedWidget: null,
  rightPaneActiveKey: 'attributes'
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
        addWidgetToList(draft, action.payload);
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
    ),
    deleteWidget: produce(
      (draft: QuestionEditorState, action: PayloadAction<string>) => {
        const targetId = action.payload;

        /** 删除前需要重置selectId */
        draft.selectedId = genNextSelectId(draft, targetId);

        const index = draft.widgetList.findIndex((w) => w.fe_id === targetId);
        draft.widgetList.splice(index, 1);
      }
    ),
    toggleWidgetVisiable: produce(
      (
        draft: QuestionEditorState,
        action: PayloadAction<{ id: string; isHidden: boolean }>
      ) => {
        const { id: targetId, isHidden } = action.payload;

        const targetComponent = draft.widgetList.find(
          (w) => w.fe_id === targetId
        );

        if (targetComponent) {
          /** 隐藏前需要重置selectId */
          draft.selectedId = genNextSelectId(draft, targetId);
          targetComponent.isHidden = isHidden;
        }
      }
    ),
    toggleWidgetLock: produce(
      (draft: QuestionEditorState, action: PayloadAction<{ id: string }>) => {
        const targetId = action.payload.id;
        const targetComponent = draft.widgetList.find(
          (w) => w.fe_id === targetId
        );
        if (targetComponent) {
          targetComponent.isLocked = !targetComponent.isLocked;
        }
      }
    ),
    copyWidget: produce((draft: QuestionEditorState) => {
      const { selectedId } = draft;
      const copiedWidget = draft.widgetList.find((w) => w.fe_id === selectedId);
      if (copiedWidget) {
        draft.copiedWidget = _.cloneDeep(copiedWidget);
        notification.success({ message: '组件复制成功' });
      }
    }),
    pasteWidget: produce((draft: QuestionEditorState) => {
      const { copiedWidget } = draft;
      if (!copiedWidget) return;
      copiedWidget.fe_id = nanoid(18);
      addWidgetToList(draft, copiedWidget);
    }),
    selectPrev: produce((draft: QuestionEditorState) => {
      const { selectedId, widgetList } = draft;
      const visiableWidgetList = widgetList.filter((w) => !w.isHidden);
      if (!visiableWidgetList.length) return;
      const index = visiableWidgetList.findIndex((w) => w.fe_id === selectedId);
      if (index <= 0) {
        draft.selectedId = visiableWidgetList[0].fe_id;
        return;
      } else {
        draft.selectedId = visiableWidgetList[index - 1].fe_id;
      }
    }),
    selectNext: produce((draft: QuestionEditorState) => {
      const { selectedId, widgetList } = draft;
      const visiableWidgetList = widgetList.filter((w) => !w.isHidden);
      if (!visiableWidgetList.length) return;
      const index = visiableWidgetList.findIndex((w) => w.fe_id === selectedId);
      if (index === -1) {
        draft.selectedId = visiableWidgetList[0].fe_id;
        return;
      }
      if (index === visiableWidgetList.length - 1) {
        return;
      }
      draft.selectedId = visiableWidgetList[index + 1].fe_id;
    })
  }
});

/** 删除组件或者隐藏组件时，生成新的选中组件id */
export const genNextSelectId = (
  draft: QuestionEditorState,
  id: string
): string | null => {
  let nextId = null;
  const { widgetList } = draft;
  const visiableList = widgetList.filter((w) => !w.isHidden);
  const index = visiableList.findIndex((w) => w.fe_id === id);

  if (visiableList.length === 1) {
    nextId = null;
  } else if (index === visiableList.length - 1) {
    nextId = visiableList[index - 1].fe_id;
  } else {
    nextId = visiableList[index + 1].fe_id;
  }

  return nextId;
};

export const addWidgetToList = (
  draft: QuestionEditorState,
  widget: WidgetInfo
) => {
  /** 如果有选中组件添加到选中组件的后面，如果没有添加到列表结尾 */
  if (draft.selectedId) {
    const index = draft.widgetList.findIndex(
      (item) => item.fe_id === draft.selectedId
    );
    draft.widgetList.splice(index + 1, 0, widget);
  } else {
    draft.widgetList.push(widget);
  }
  draft.selectedId = widget.fe_id;
};
