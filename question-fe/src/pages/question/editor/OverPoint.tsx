import React from 'react';
import styles from './index.module.scss';
import cs from 'classnames';

interface OverPointProps {
  className?: string;
  style?: React.CSSProperties;
}

export const OverPoint: React.FC<OverPointProps> = (props) => {
  const { className, style } = props;

  return (
    <div className={cs(styles['over-point'], className)} style={style}>
      <div className={styles['point-content']} />
    </div>
  );
};
