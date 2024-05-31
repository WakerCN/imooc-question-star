import React from 'react';
import styles from './index.module.scss';
import { Spin } from 'antd';
import cn from 'classnames';

interface LoadingProps {
  tip?: string; // 提示信息
  classname?: string; // 类名
}

export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const { tip = '加载中...', classname } = props;

  return (
    <Spin tip={tip}>
      <section className={cn(styles['loading-wrap'], classname)}></section>
    </Spin>
  );
};
