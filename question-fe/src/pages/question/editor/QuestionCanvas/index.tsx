/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 17:57
 * @LastEditTime : 2024-03-25 10:11
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
import { SortableContext } from '@dnd-kit/sortable';

interface Props {}

export const QuestionCanvas: React.FC<Props> = () => {
  useKeyboardShortcuts();

  const { widgetList } = useGetQuestionDetail();
  const visiableWidgetList = widgetList.filter((w) => !w.isHidden);
  const sortItems = visiableWidgetList.map((item) => item.fe_id);
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
        <SortableContext items={sortItems}>
          {visiableWidgetList.map((info) => {
            return <WidgetItem key={info.fe_id} info={info} />;
          })}
          {/* {isOver && <div className={styles['drop-point']} />} */}
        </SortableContext>
      </div>
    </div>
  );
};
