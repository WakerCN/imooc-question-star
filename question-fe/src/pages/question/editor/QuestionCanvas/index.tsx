import React from 'react';
import styles from './index.module.scss';

interface Props {}

export const QuestionCanvas: React.FC<Props> = () => {
  return (
    <div className={styles['question-canvas-area']}>
      <div className={styles['canvas']}>画布</div>
    </div>
  );
};
