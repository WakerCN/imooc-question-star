import { useTitle } from '@/hooks/common';
import { useQuestionDetail } from '@/hooks/question';
import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { Spin } from 'antd';
import { ErrorPage } from '@/components/ErrorPage';
import { LeftPane } from './LeftPane';
import { RightPane } from './RightPane';
import { QuestionCanvas } from './QuestionCanvas';

interface Props {}

export const QuestionEditor: React.FC<Props> = () => {
  const params = useParams();

  useTitle(`编辑 ${params.id}`);

  const { loading, error } = useQuestionDetail();

  return (
    <div className={styles['editor-page']}>
      {loading ? (
        <Spin fullscreen tip={'正在加载问卷详细...'} />
      ) : error ? (
        <ErrorPage msg={error.message} />
      ) : (
        <div className={styles['edit-main']}>
          <LeftPane />
          <QuestionCanvas />
          <RightPane />
        </div>
      )}
    </div>
  );
};
