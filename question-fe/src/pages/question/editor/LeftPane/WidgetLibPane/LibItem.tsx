import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetConfig, getLibConfigByName } from '@/widgets';
import { useDraggable } from '@dnd-kit/core';
import { nanoid } from 'nanoid';
import React from 'react';
import { LibBaseItem } from './LibBaseItem';
import styles from './index.module.scss';

interface LibItemProps {
  info: WidgetConfig;
}

export const LibItem: React.FC<LibItemProps> = (props) => {
  const { info } = props;
  const { name } = info;

  const dispatch = useAppDispatch();
  const { addWidget } = questionSlice.actions;

  const { setNodeRef, attributes, listeners } = useDraggable({
    id: name,
    data: { type: 'lib', info }
  });

  const handleAdd = () => {
    const compConfig = getLibConfigByName(info.name);
    if (compConfig) {
      const { defaultProps, baseType, name } = compConfig;
      dispatch(
        addWidget({
          fe_id: nanoid(18),
          title: name,
          isHidden: false,
          isLocked: false,
          baseType,
          props: defaultProps
        })
      );
    }
  };

  return (
    <div
      className={styles['drag-item-lib']}
      ref={setNodeRef}
      onDoubleClick={handleAdd}
      {...attributes}
      {...listeners}
    >
      <LibBaseItem info={info} />
    </div>
  );
};
