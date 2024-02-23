import { QuestionList } from '@/components/QuestionList';
import React from 'react';
import styles from './index.module.scss';

interface Props {}

export const MyQuestions: React.FC<Props> = () => {
  return (
    <div className={styles['question-manager']}>
      <QuestionList type="my-question" />
    </div>
  );
};
