import { ListSearch } from '@/components/ListSearch';
import React from 'react';
import styles from './index.module.scss';

interface Props {}

export const StarQuestions: React.FC<Props> = () => {
  return (
    <div className={styles['recycle-bin']}>
      <section className={styles['search-header']}>
        <h2 className={styles['title']}>收藏问卷</h2>
        <ListSearch />
      </section>
      <div className={styles['list']}>list</div>
    </div>
  );
};
