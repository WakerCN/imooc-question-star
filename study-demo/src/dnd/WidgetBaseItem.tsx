/*
 * @Author       : 魏威
 * @Date         : 2024-03-21 09:20
 * @LastEditTime : 2024-03-21 11:13
 * @LastEditors  : Waker
 * @Description  : 基础item渲染
 */
import cs from 'classnames';
import React from 'react';
import styles from './index.module.scss';
import { useSortable } from '@dnd-kit/sortable';

interface WidgetBaseItemProps {
  info: {
    id: string;
    type: string;
  };
  isOverlay?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sortableProps?: ReturnType<typeof useSortable>;
}

export const WidgetBaseItem: React.FC<WidgetBaseItemProps> = (props) => {
  const { info, sortableProps, isOverlay = false } = props;
  const {
    isOver = false,
    isDragging = false,
    over,
    active,
  } = sortableProps || {};

  const { id, type } = info;

  const overSelf = isOver && over?.id === active?.id;

  return (
    <div
      className={cs(styles['sort-item'], {
        ['overlay']: isOverlay,
        ['over']: isOver,
        ['dragging']: isDragging,
      })}
    >
      <span>
        {id} -- {type}
      </span>
      {isOver && !overSelf && <div className={styles['over-point']} />}
    </div>
  );
};
