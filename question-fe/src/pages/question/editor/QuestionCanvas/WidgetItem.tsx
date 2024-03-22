/*
 * @Author       : 魏威
 * @Date         : 2024-03-22 11:02
 * @LastEditTime : 2024-03-22 17:34
 * @LastEditors  : Waker
 * @Description  : 带上拖拽功能的WidgetItem
 */
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetInfo } from '@/widgets';
import { useSortable } from '@dnd-kit/sortable';
import { useHover } from 'ahooks';
import React, { useRef } from 'react';
import { OverPoint } from '../OverPoint';
import { DragHandle } from './DragHandle';
import { WidgetBaseItem } from './WidgetBaseItem';
import styles from './index.module.scss';

interface WidgetItemProps {
  info: WidgetInfo;
}

export const WidgetItem: React.FC<WidgetItemProps> = (props) => {
  const { info } = props;
  const { fe_id } = info;

  const sortRef = useRef<HTMLDivElement | null>(null);

  const isHover = useHover(sortRef);

  const { selectedId } = useGetQuestionDetail();

  const dispatch = useAppDispatch();
  const { setSelectedId } = questionSlice.actions;

  const { setNodeRef, attributes, listeners, isDragging, isOver, over } =
    useSortable({
      id: fe_id,
      data: { type: 'widget', info }
    });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setSelectedId(fe_id));
  };

  const isOverSelf = over?.id === fe_id;

  return (
    <div
      ref={(node) => {
        sortRef.current = node;
        setNodeRef(node);
      }}
      className={styles['sort-item-widget']}
      style={{ outline: 'none' }}
      onClick={handleClick}
      {...attributes}
      {...listeners}
    >
      <WidgetBaseItem
        info={info}
        active={selectedId === info.fe_id}
        isDragging={isDragging}
        isOvering={isOver}
      />
      {isHover && (
        <DragHandle hoverElement={sortRef.current!} isHover={isHover} />
      )}
      {isOver && isOverSelf && <OverPoint className={styles['over-point']} />}
    </div>
  );
};
