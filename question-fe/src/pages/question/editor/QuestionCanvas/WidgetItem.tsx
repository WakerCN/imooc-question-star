/*
 * @Author       : 魏威
 * @Date         : 2024-03-22 11:02
 * @LastEditTime : 2024-03-25 15:03
 * @LastEditors  : Waker
 * @Description  : 带上拖拽功能的WidgetItem
 */
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetInfo } from '@/widgets';
import { useSortable } from '@dnd-kit/sortable';
import React, { useRef } from 'react';
import { OverPoint } from '../OverPoint';
import { WidgetBaseItem } from './WidgetBaseItem';
import styles from './index.module.scss';

interface WidgetItemProps {
  info: WidgetInfo;
}

export const WidgetItem: React.FC<WidgetItemProps> = (props) => {
  const { info } = props;
  const { fe_id } = info;

  const sortRef = useRef<HTMLDivElement | null>(null);

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
  const isAcitive = selectedId === info.fe_id;

  // useEffect(() => {
  //   sortRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  // }, [isAcitive]);

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
        active={isAcitive}
        isDragging={isDragging}
        isOvering={isOver}
      />
      {isOver && isOverSelf && <OverPoint className={styles['over-point']} />}
    </div>
  );
};
