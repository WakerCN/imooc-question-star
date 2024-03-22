/*
 * @Author       : 魏威
 * @Date         : 2024-03-22 13:52
 * @LastEditTime : 2024-03-22 13:59
 * @LastEditors  : Waker
 * @Description  :
 */
import { HBIcon } from '@/components/HBIcon';
import React from 'react';
import cs from 'classnames';
import styles from './index.module.scss';
import { WidgetConfig } from '@/widgets';

interface LibBaseItemProps {
  info: WidgetConfig;
  isOverlay?: boolean;
}

export const LibBaseItem: React.FC<LibBaseItemProps> = (props) => {
  const { info, isOverlay = false } = props;
  const { iconKey, name } = info;

  return (
    <div
      className={cs(styles['widget-item'], { [styles['overlay']]: isOverlay })}
    >
      <HBIcon iconKey={iconKey} size={24} style={{ margin: 8 }} />
      <div className={styles['title']}>{name}</div>
    </div>
  );
};
