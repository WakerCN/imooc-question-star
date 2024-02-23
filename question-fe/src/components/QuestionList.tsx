import { useQuestionList } from '@/hooks/question';
import { Col, Empty, Row } from 'antd';
import React from 'react';
import { ListSearch } from './ListSearch';
import { Loading } from './Loading';
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

  const { data = {}, loading } = useQuestionList(params);

  const { list: questionList = [] } = data;

  return (
    <div className={styles['question-list']}>
      <section className={styles['search-header']}>
        <h2 className={styles['title']}>
          {isMyQuestion ? '问卷列表' : isStarQuestion ? '收藏问卷' : ''}
        </h2>
        <ListSearch />
      </section>
      <Row className={styles['list']} gutter={[10, 10]}>
        {loading ? (
          <Loading />
        ) : questionList.length ? (
          questionList.map((question: QuestionInfo) => (
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
