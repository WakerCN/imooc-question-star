import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { RollbackOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface Props {}

export const QuestionLayout: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles['quesion-layout']}>
      <header className={styles['header']}>
        <Button className={styles['back-btn']} type="text" onClick={handleBack}>
          <RollbackOutlined />
        </Button>
      </header>
      <main className={styles['main']}>
        <Outlet />
      </main>
    </div>
  );
};
