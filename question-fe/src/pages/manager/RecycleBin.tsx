import { ListSearch } from '@/components/ListSearch';
import { QuestionInfo } from '@/components/QuestionCard';
import { useQuestionList } from '@/hooks/question';
import { useSize } from 'ahooks';
import { Button, Space, Table, TableColumnsType, TableProps, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SEARCH_KEY } from '@/constants';

interface Props {}

export const RecycleBin: React.FC<Props> = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get(SEARCH_KEY.PAGE) || '') || 1
  );
  const [pageSize, setPageSize] = useState<number>(
    parseInt(searchParams.get(SEARCH_KEY.SIZE) || '') || 10
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const page = parseInt(searchParams.get(SEARCH_KEY.PAGE) || '') || 1;
    setPage(page);
    const pageSize = parseInt(searchParams.get(SEARCH_KEY.SIZE) || '') || 10;
    setPageSize(pageSize);
  }, [searchParams]);

  const { data = {}, loading } = useQuestionList({ isDeleted: true });
  const { list: questionList = [], total = 0 } = data;

  const ref = useRef<HTMLDivElement>(null);
  const tableSize = useSize(ref);

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

  const paginationHeight = 64;
  const tableHeaderHeight = 55;
  const scrollY =
    (tableSize?.height || 1000) - paginationHeight - tableHeaderHeight;

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
      total,
      current: page,
      pageSize,
      onChange: (page, pageSize) => {
        searchParams.set(SEARCH_KEY.PAGE, page.toString());
        searchParams.set(SEARCH_KEY.SIZE, pageSize.toString());
        navigate({ pathname, search: searchParams.toString() });
      }
    },
    scroll: scrollY < 56 * pageSize ? { y: scrollY } : undefined
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
      <div className={styles['list']} ref={ref}>
        <Table className={styles['table']} {...tableProps} />
      </div>
    </div>
  );
};
