import { QuestionList } from '@/components/QuestionList';
import React from 'react';
import styles from './index.module.scss';

interface Props {}

export const StarQuestions: React.FC<Props> = () => {
  return (
    <div className={styles['star-question']}>
      <QuestionList type="star" />
    </div>
  );
};
