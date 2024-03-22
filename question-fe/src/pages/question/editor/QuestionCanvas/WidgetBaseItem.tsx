import { WidgetInfo, getConfigByBaseType } from '@/widgets';
import React from 'react';
import styles from './index.module.scss';
import cs from 'classnames';

interface WidgetBaseItemProps {
  info: WidgetInfo;
  active?: boolean;
  isOverlay?: boolean;
  isDragging?: boolean;
  isOvering?: boolean;
}

const genateCompoenent = (info: WidgetInfo) => {
  const { props, baseType } = info;
  const config = getConfigByBaseType(baseType);

  if (!config) {
    return null;
  }
  const { Component } = config;
  return <Component {...props} />;
};

export const WidgetBaseItem: React.FC<WidgetBaseItemProps> = (props) => {
  const {
    info,
    active = false,
    isOverlay = false,
    isDragging = false,
    isOvering = false
  } = props;
  const { isLocked } = info;

  return (
    <div
      className={cs(styles['widget-wrap'], {
        ['overlay']: isOverlay, // 非激活状态
        ['active']: active,
        ['locked']: isLocked,
        ['dragging']: isDragging,
        ['over']: isOvering
      })}
    >
      <div className={styles['mask-wrap']}>{genateCompoenent(info)}</div>
    </div>
  );
};
