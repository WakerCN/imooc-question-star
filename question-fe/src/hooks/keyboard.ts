/*
 * @Author       : 魏威
 * @Date         : 2024-03-12 16:45
 * @LastEditTime : 2024-03-25 14:35
 * @LastEditors  : Waker
 * @Description  : 键盘快捷键
 */

import { questionSlice } from '@/stores/question';
import { useKeyPress } from 'ahooks';
import { useGetQuestionDetail } from './question';
import { useAppDispatch } from './redux';

export const isActiveVaild = () => {
  if (['TEXTAREA', 'INPUT'].includes(document.activeElement?.tagName || '')) {
    return false;
  }
  return true;
};

/** 全局快捷键 */
export const useKeyboardShortcuts = () => {
  const dispatch = useAppDispatch();
  const { selectedId } = useGetQuestionDetail();
  const {
    deleteWidget,
    toggleWidgetVisiable,
    toggleWidgetLock,
    copyWidget,
    pasteWidget,
    selectPrev,
    selectNext
  } = questionSlice.actions;

  /** 删除 */
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveVaild()) return;
    if (selectedId) {
      dispatch(deleteWidget(selectedId));
    }
  });

  /** 隐藏 */
  useKeyPress('ctrl.h', (event) => {
    event.preventDefault();
    if (!isActiveVaild()) return;
    if (selectedId) {
      dispatch(toggleWidgetVisiable({ id: selectedId, isHidden: true }));
    }
  });

  /** 锁定 */
  useKeyPress('ctrl.l', (event) => {
    event.preventDefault();
    if (!isActiveVaild()) return;
    if (selectedId) {
      dispatch(toggleWidgetLock({ id: selectedId }));
    }
  });

  /** 复制 */
  useKeyPress('ctrl.c', () => {
    if (!isActiveVaild()) return;
    if (selectedId) {
      dispatch(copyWidget());
    }
  });

  /** 粘贴 */
  useKeyPress('ctrl.v', () => {
    if (!isActiveVaild()) return;
    dispatch(pasteWidget());
  });

  /** 选中上一个 */
  useKeyPress('uparrow', (event) => {
    event.preventDefault();
    if (!isActiveVaild()) return;
    dispatch(selectPrev());
  });

  /** 选中下一个 */
  useKeyPress('downarrow', (event) => {
    event.preventDefault();
    if (!isActiveVaild()) return;
    dispatch(selectNext());
  });
};
