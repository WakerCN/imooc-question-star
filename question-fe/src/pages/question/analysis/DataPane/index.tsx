/*
 * @Author       : 魏威
 * @Date         : 2024-03-29 17:29
 * @LastEditTime : 2024-04-22 16:02
 * @LastEditors  : starone
 * @Description  :
 */
import { useGetAnalysisDetail } from '@/hooks/analysis';
import { useSize } from 'ahooks';
import { Table, TableColumnsType, Tag, Typography } from 'antd';
import cs from 'classnames';
import React, { useRef } from 'react';
import styles from './index.module.scss';

interface DataPaneProps {}

export const DataPane: React.FC<DataPaneProps> = () => {
  const { selectedId, analysisDetail } = useGetAnalysisDetail();
  const { answerList } = analysisDetail;

  const paneRef = useRef<HTMLDivElement>(null);
  const paneSize = useSize(paneRef);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tableColumns: TableColumnsType<any> = [
    {
      title: 'id',
      dataIndex: 'id',
      fixed: 'left',
      width: 250
    },
    {
      title: '姓名',
      dataIndex: ['qid-name'],
      width: 80
    },
    {
      title: '电话',
      dataIndex: ['qid-tel'],
      width: 130
    },
    {
      title: '性别',
      dataIndex: ['qid-gender'],
      width: 60
    },
    {
      title: '技术栈',
      dataIndex: ['qid-technology'],
      render: (value) => {
        if (typeof value === 'string') {
          return <Tag>{value}</Tag>;
        } else if (Array.isArray(value)) {
          return <>{value?.map((v: string) => <Tag key={v}>{v}</Tag>)}</>;
        }
      }
    }
  ];

  const panePadding = 40;
  const paginationHeight = 64;
  const tableHeaderHeight = 55;

  return (
    <div
      ref={paneRef}
      className={cs(styles['data-pane'], { ['full']: !selectedId })}
    >
      <Typography.Title
        level={2}
        style={{ margin: 0, marginBottom: 10, userSelect: 'none' }}
      >
        答卷分析
      </Typography.Title>
      <section className={styles['chart-area']}>
        <div className={styles['kpi']}>答卷总数：100</div>
      </section>
      <Table
        rowKey={'id'}
        pagination={{ total: 100 }}
        dataSource={answerList}
        columns={tableColumns}
        scroll={{
          x: 'max-content',
          y: !paneSize?.height
            ? 'auto'
            : paneSize.height -
              panePadding -
              48 -
              52 -
              tableHeaderHeight -
              paginationHeight
        }}
      />
    </div>
  );
};
