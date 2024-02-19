import { MockData } from '@/mocks/question-list';
import { Col, Empty, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListSearch } from './ListSearch';
import { QuestionCard, QuestionInfo } from './QuestionCard';
import styles from './index.module.scss';

interface QuestionListProps {}

export const QuestionList: React.FC<QuestionListProps> = () => {
  const [questionList, setQuestionList] = useState<QuestionInfo[]>(
    MockData.questionList
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setQuestionList(
      MockData.questionList.filter((question) =>
        question.title.includes(searchParams.get('keywords') || '')
      )
    );
  }, [searchParams]);

  return (
    <div className={styles['question-list']}>
      <section className={styles['search-header']}>
        <h2 className={styles['title']}>问卷列表</h2>
        <ListSearch />
      </section>
      <Row className={styles['list']} gutter={[10, 10]}>
        {questionList.length ? (
          questionList.map((question) => (
            <Col key={question._id} span={24}>
              <QuestionCard info={question} />
            </Col>
          ))
        ) : (
          <Empty
            style={{ width: '100%' }}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无问卷"
          />
        )}
      </Row>
    </div>
  );
};
