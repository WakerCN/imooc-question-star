/*
 * @Author       : 魏威
 * @Date         : 2024-03-29 17:29
 * @LastEditTime : 2024-03-29 17:45
 * @LastEditors  : Waker
 * @Description  :
 */
import React from 'react';
import styles from './index.module.scss';
import { Table, Typography } from 'antd';

interface DataPaneProps {}

export const DataPane: React.FC<DataPaneProps> = (props) => {
  console.log('DataPane props: ', props);

  return (
    <div className={styles['data-pane']}>
      <Typography.Title level={2} style={{ margin: 0, marginBottom: 10 }}>
        答卷分析
      </Typography.Title>
      <section className={styles['chart-area']}>
        <div className={styles['kpi']}>答卷总数：100</div>
        <div className={styles['chart']}>chart</div>
      </section>
      <Table></Table>
    </div>
  );
};
