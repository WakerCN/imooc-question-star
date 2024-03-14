import React from 'react';
import styles from './index.module.scss';
import '@/assets/iconFont/iconfont.js';
import cx from 'classnames';

export type HBIconKey =
  | 'paragraph'
  | 'h1'
  | 'h3'
  | 'h2'
  | 'radio-ok'
  | 'radio'
  | 'locate'
  | 'divider'
  | 'input'
  | 'textarea'
  | 'star'
  | 'qr-code'
  | 'link'
  | 'description'
  | 'select'
  | 'date'
  | 'time'
  | 'phone'
  | 'number'
  | 'select-muti'
  | 'email'
  | 'checkbox'
  | 'switch'
  | 'tag'
  | string;

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
