import React from 'react';
import styles from './index.module.scss';
import { Spin } from 'antd';

interface LoadingProps {
  tip?: string; // 提示信息
}

export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const { tip = '加载中...' } = props;

  return (
    <Spin tip={tip}>
      <section className={styles['loading-wrap']}></section>
    </Spin>
  );
};
