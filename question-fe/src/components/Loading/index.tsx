import React from 'react';
import styles from './index.module.scss';
import { Spin } from 'antd';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
  return (
    <section className={styles['loading-wrap']}>
      <Spin />
    </section>
  );
};
