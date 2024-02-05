import { MockData } from '@/mocks/question-list';
import { SearchOutlined } from '@ant-design/icons';
import { Col, Empty, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { QuestionCard, QuestionInfo } from './QuestionCard';
import styles from './index.module.scss';

interface QuestionListProps {}

export const QuestionList: React.FC<QuestionListProps> = () => {
  const [questionList, setQuestionList] = useState<QuestionInfo[]>(
    MockData.questionList
  );
  const [keywords, setKeywords] = useState<string>('');

  useEffect(() => {
    setQuestionList(
      MockData.questionList.filter((question) =>
        question.title.includes(keywords)
      )
    );
  }, [keywords]);

  return (
    <div className={styles['question-list']}>
      <section className={styles['search-header']}>
        <h2 className={styles['title']}>问卷列表</h2>
        <Input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          size="small"
          className={styles['input']}
          placeholder="请输入关键字"
          prefix={<SearchOutlined />}
        />
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
