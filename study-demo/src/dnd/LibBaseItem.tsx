import { useDraggable } from '@dnd-kit/core';
import cs from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface LibBaseItemProps {
  info: { name: string };
  dragableProps?: ReturnType<typeof useDraggable>;
  isOverlay?: boolean;
}

export const LibBaseItem: React.FC<LibBaseItemProps> = (props) => {
  const {
    info: { name },
    dragableProps,
    isOverlay = false,
  } = props;

  const { isDragging } = dragableProps || {};

  return (
    <div
      className={cs(styles['lib-item'], {
        ['dragging']: isDragging,
        ['overlay']: isOverlay,
      })}
    >
      <span className={styles['label']}>{name}</span>
    </div>
  );
};
