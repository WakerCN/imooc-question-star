import { PAGINATION, SEARCH_KEY } from '@/constants';
import { QuestionService } from '@/services/question';
import { useDebounceFn, useRequest } from 'ahooks';
import { Col, Empty, Row, Space, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListSearch } from './ListSearch';
import { QuestionCard, QuestionInfo } from './QuestionCard';
import styles from './index.module.scss';

interface QuestionListProps {
  type: 'my-question' | 'star';
}

export const QuestionList: React.FC<QuestionListProps> = (props) => {
  const { type = 'my-question' } = props;

  const isMyQuestion = type === 'my-question';
  const isStarQuestion = type === 'star';
  const params = isMyQuestion ? {} : isStarQuestion ? { isStar: true } : {};

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(SEARCH_KEY.KEYWORD) || '';

  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState([]);

  const [started, setstarted] = useState(false);

  const hasMoreData = total > list.length;

  const loadRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listRefValue = listRef.current;

  const { run: tryLoadMore } = useDebounceFn(
    () => {
      if (!loadRef.current || !listRef.current) return;
      const loadDomRect = loadRef.current.getBoundingClientRect();
      const listDomRect = listRef.current.getBoundingClientRect();

      if (!loadDomRect || !listDomRect) return;
      if (loadDomRect.bottom <= listDomRect.bottom) {
        loadList();
        setstarted(false);
      }
    },
    { wait: 1000 }
  );

  const { run: loadList, loading } = useRequest(
    async () =>
      await QuestionService.getQuestionList({
        page,
        pageSize: PAGINATION.SIZE,
        keyword: searchParams.get(SEARCH_KEY.KEYWORD) || '',
        ...params
      }),
    {
      manual: true,
      onSuccess: (response) => {
        const { list: appendList = [], total = 0 } = response;
        setList(list.concat(appendList));
        setTotal(total);
        setPage(page + 1);
      }
    }
  );

  /** 加载第一页 */
  useEffect(() => {
    tryLoadMore();
  }, [searchParams, tryLoadMore]);

  useEffect(() => {
    if (hasMoreData) {
      listRef.current?.addEventListener('scroll', tryLoadMore);
    }

    return () => {
      listRefValue?.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, hasMoreData, tryLoadMore, listRefValue]);

  /** keyword变化时重置所有参数 */
  useEffect(() => {
    setPage(1);
    setTotal(0);
    setList([]);
  }, [keyword]);

  const loadElement = () => {
    if (loading) {
      return (
        <div className={styles['load-more-wrap']} ref={loadRef}>
          <Space>
            <Spin /> 加载更多...
          </Space>
        </div>
      );
    }
    if (hasMoreData)
      return (
        <div className={styles['load-more-wrap']} ref={loadRef}>
          加载更多...
        </div>
      );

    if (!hasMoreData) {
      return (
        <div className={styles['load-more-wrap']} ref={loadRef}>
          已经到底啦 ~
        </div>
      );
    }
  };

  return (
    <div className={styles['question-list']}>
      <section className={styles['search-header']}>
        <h2 className={styles['title']}>
          {isMyQuestion ? '问卷列表' : isStarQuestion ? '收藏问卷' : ''}
        </h2>
        <ListSearch />
      </section>
      <Row ref={listRef} className={styles['list']} gutter={[10, 10]}>
        {list.length
          ? list.map((question: QuestionInfo) => (
              <Col key={question._id} span={24}>
                <QuestionCard info={question} />
              </Col>
            ))
          : started && (
              <Empty
                style={{ width: '100%' }}
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="暂无问卷"
              />
            )}
        {loadElement()}
      </Row>
    </div>
  );
};
