/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 17:57
 * @LastEditTime : 2024-03-15 17:35
 * @LastEditors  : Waker
 * @Description  : 画布
 */
import { useKeyboardShortcuts } from '@/hooks/keyboard';
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import React from 'react';
import styles from './index.module.scss';
import { WidgetDropItem } from './WidgetDropItem';

interface Props {}

export const QuestionCanvas: React.FC<Props> = () => {
  useKeyboardShortcuts();

  const { widgetList } = useGetQuestionDetail();
  const dispatch = useAppDispatch();
  const { setSelectedId } = questionSlice.actions;

  const handlClickWhiteArea = () => {
    dispatch(setSelectedId(null));
  };

  return (
    <div
      className={styles['question-canvas-area']}
      onClick={handlClickWhiteArea}
    >
      <div className={styles['canvas']}>
        {widgetList
          .filter((w) => !w.isHidden)
          .map((info) => {
            return <WidgetDropItem data={info} />;
          })}
      </div>
    </div>
  );
};
