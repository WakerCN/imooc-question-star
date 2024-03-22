/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 17:57
 * @LastEditTime : 2024-03-22 14:24
 * @LastEditors  : Waker
 * @Description  : 画布
 */
import { useKeyboardShortcuts } from '@/hooks/keyboard';
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { useDroppable } from '@dnd-kit/core';
import React from 'react';
import { WidgetItem } from './WidgetItem';
import styles from './index.module.scss';

interface Props {}

export const QuestionCanvas: React.FC<Props> = () => {
  useKeyboardShortcuts();

  const { widgetList } = useGetQuestionDetail();
  const dispatch = useAppDispatch();
  const { setSelectedId } = questionSlice.actions;

  const handlClickWhiteArea = () => {
    dispatch(setSelectedId(null));
  };

  const { setNodeRef } = useDroppable({ id: 'canvas' });

  return (
    <div
      className={styles['question-canvas-area']}
      onClick={handlClickWhiteArea}
    >
      <div className={styles['canvas']} ref={setNodeRef}>
        {widgetList
          .filter((w) => !w.isHidden)
          .map((info) => {
            return <WidgetItem key={info.fe_id} info={info} />;
          })}
        {/* {isOver && <div className={styles['drop-point']} />} */}
      </div>
    </div>
  );
};
