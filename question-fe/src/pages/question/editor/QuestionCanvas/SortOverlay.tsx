import { WidgetInfo, getBaseTypeIconKey } from '@/widgets';
import { DragOverlay } from '@dnd-kit/core';
import React from 'react';
import { WidgetBaseItem } from './WidgetBaseItem';
import styles from './SortOverlay.module.scss';
import { HBIcon } from '@/components/HBIcon';
import { Typography } from 'antd';

interface SortOverlayProps {
  info: WidgetInfo;
}

export const SortOverlay: React.FC<SortOverlayProps> = (props) => {
  const { info } = props;

  return (
    <DragOverlay>
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
