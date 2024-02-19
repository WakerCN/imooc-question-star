import React, { useState } from 'react';
import styles from './index.module.scss';
import { ListSearch } from '@/components/ListSearch';
import { Button, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import { MockData } from '@/mocks/question-list';
import { QuestionInfo } from '@/components/QuestionCard';

interface Props {}

export const RecycleBin: React.FC<Props> = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: TableColumnsType<QuestionInfo> = [
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished) =>
        isPublished ? (
          <Tag color="green">已发布</Tag>
        ) : (
          <Tag color="default">未发布</Tag>
        )
    },
    {
      title: '答卷数',
      dataIndex: 'answerCount'
    },
    {
      title: '创建时间',
      dataIndex: 'createAt'
    }
  ];

  const tableProps: TableProps<QuestionInfo> = {
    dataSource: MockData.questionList,
    columns,
    rowKey: (record) => record._id,
    rowSelection: {
      selectedRowKeys,
      onChange: onSelectChange
    }
  };

  return (
    <div className={styles['recycle-bin']}>
      <section className={styles['search-header']}>
        <h2 className={styles['title']}>回收站</h2>
        <ListSearch />
      </section>
      <Space className={styles['operate-btns']}>
        <Button disabled={selectedRowKeys.length === 0}>恢复</Button>
        <Button disabled={selectedRowKeys.length === 0}>彻底删除</Button>
      </Space>
      <div className={styles['list']}>
        <Table {...tableProps} />
      </div>
    </div>
  );
};
