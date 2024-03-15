/*
 * @Author       : 魏威
 * @Date         : 2024-03-15 16:32
 * @LastEditTime : 2024-03-15 17:01
 * @LastEditors  : Waker
 * @Description  :
 */

import { HBIcon } from '@/components/HBIcon';
import { WidgetConfig, getLibConfigByName } from '@/widgets';
import React from 'react';
import styles from './index.module.scss';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { nanoid } from 'nanoid';
import { useDraggable } from '@dnd-kit/core';
import cx from 'classnames';

interface Props {
  data: WidgetConfig;
  isOverlay?: boolean;
}

export const WidgetItem: React.FC<Props> = (props) => {
  const { data: config, isOverlay = false } = props;

  const dispatch = useAppDispatch();
  const { addWidget } = questionSlice.actions;

  const { setNodeRef, attributes, listeners } = useDraggable({
    id: config.name,
    data: config
  });

  const handleAdd = (config: WidgetConfig) => {
    const compConfig = getLibConfigByName(config.name);
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

  return isOverlay ? (
    <div className={cx(styles['widget-item'], styles['overlay'])}>
      <HBIcon iconKey={config.iconKey} size={24} style={{ margin: 8 }} />
      <div className={styles['title']}>{config.name}</div>
    </div>
  ) : (
    <div
      ref={setNodeRef}
      className={styles['widget-item']}
      onDoubleClick={() => handleAdd(config)}
      {...listeners}
      {...attributes}
    >
      <HBIcon iconKey={config.iconKey} size={24} style={{ margin: 8 }} />
      <div className={styles['title']}>{config.name}</div>
    </div>
  );
};
