import { ErrorPage } from '@/components/ErrorPage';
import { useTitle } from '@/hooks/common';
import { useLoadQuestionDetail } from '@/hooks/question';
import { Spin } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';

interface Props {}

export const QuestionAnalysis: React.FC<Props> = () => {
  const params = useParams();
  const { loading, error, data } = useLoadQuestionDetail();

  useTitle(`问卷分析 ${params.id}`);

  return (
    <div className={styles['analysis-page']}>
      {loading ? (
        <Spin fullscreen tip={'加载问卷详情中...'} />
      ) : error ? (
        <ErrorPage msg={error.message} />
      ) : (
        <div>
          QuestionAnalysis {[params.id]}
          {JSON.stringify(data)}
        </div>
      )}
    </div>
  );
};
