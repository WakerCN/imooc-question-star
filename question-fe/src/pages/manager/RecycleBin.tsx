import { ListSearch } from '@/components/ListSearch';
import { QuestionInfo } from '@/components/QuestionCard';
import { useQuestionList } from '@/hooks/question';
import { Button, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import React, { useState } from 'react';
import styles from './index.module.scss';

interface Props {}

export const RecycleBin: React.FC<Props> = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data = {}, loading } = useQuestionList({ isDeleted: true });
  const { list: questionList = [], total = 0 } = data;

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
    dataSource: questionList,
    columns,
    loading,
    rowKey: (record) => record._id,
    rowSelection: {
      selectedRowKeys,
      onChange: onSelectChange
    },
    pagination: {
      total
    }
  };

  return (
    <div className={styles['recycle-bin']}>
      <section className={styles['search-header']}>
        <h2 className={styles['title']}>回收站</h2>
        <ListSearch />
      </section>
      <Space className={styles['operate-btns']}>
        <Button type={'primary'} disabled={selectedRowKeys.length === 0}>
          恢复
        </Button>
        <Button danger disabled={selectedRowKeys.length === 0}>
          彻底删除
        </Button>
      </Space>
      <div className={styles['list']}>
        <Table {...tableProps} />
      </div>
    </div>
  );
};
