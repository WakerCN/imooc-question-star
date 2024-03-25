import React from 'react';
import styles from './index.module.scss';
import '@/assets/iconFont/iconfont.js';
import cx from 'classnames';

export type HBIconKey =
  | 'drag-handle'
  | 'lib-rate'
  | 'lib-slider'
  | 'lib-textarea'
  | 'star'
  | 'lib-radio'
  | 'lib-input'
  | 'baseType-title'
  | 'lib-paragraph'
  | 'baseType-paragraph-copy'
  | 'lib-h1'
  | 'lib-h3'
  | 'lib-h2'
  | 'locate'
  | 'divider'
  | 'qr-code'
  | 'link'
  | 'description'
  | 'lib-select'
  | 'date'
  | 'time'
  | 'phone'
  | 'number'
  | 'lib-select-muti'
  | 'email'
  | 'checkbox'
  | 'switch'
  | 'tag';

interface HBIconProps {
  style?: React.CSSProperties;
  classNames?: string;
  iconKey: HBIconKey;
  size?: number; // 单位px
}

export const HBIcon: React.FC<HBIconProps> = (props) => {
  const { iconKey, style, classNames, size } = props;

  const finalStyle = size ? { ...style, width: size, height: size } : style;

  return (
    <svg
      className={cx(styles['hb-icon'], classNames)}
      style={finalStyle}
      aria-hidden="true"
    >
      <use xlinkHref={`#icon-${iconKey}`}></use>
    </svg>
  );
};
