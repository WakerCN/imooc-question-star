/*
 * @Author       : 魏威
 * @Date         : 2024-03-25 10:20
 * @LastEditTime : 2024-03-26 10:04
 * @LastEditors  : Waker
 * @Description  :
 */
import { HBIcon } from '@/components/HBIcon';
import { WidgetInfo, getBaseTypeIconKey } from '@/widgets';
import { DragOverlay } from '@dnd-kit/core';
import { Typography } from 'antd';
import React from 'react';
import styles from './SortOverlay.module.scss';
import { WidgetBaseItem } from './WidgetBaseItem';

interface SortOverlayProps {
  info: WidgetInfo;
}

export const SortOverlay: React.FC<SortOverlayProps> = (props) => {
  const { info } = props;

  return (
    <DragOverlay modifiers={[]}>
      <div className={styles['sort-overlay']}>
        <WidgetBaseItem info={info} isOverlay />
        <div className={styles['min-info']}>
          <HBIcon
            iconKey={getBaseTypeIconKey(info.baseType)}
            size={14}
            style={{ marginRight: 10 }}
          />
          <Typography.Text>{info.title}</Typography.Text>
        </div>
      </div>
    </DragOverlay>
  );
};
