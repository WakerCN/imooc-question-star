/*
 * @Author       : 魏威
 * @Date         : 2024-03-22 13:52
 * @LastEditTime : 2024-06-26 09:34
 * @LastEditors  : Waker
 * @Description  :
 */
import { HBIcon } from '@/components/HBIcon';
import { WidgetConfig } from '@/widgets';
import cs from 'classnames';
import React from 'react';
import styles from './index.module.scss';

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
