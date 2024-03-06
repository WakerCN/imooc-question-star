import { useLoadUserInfo } from '@/hooks/user';
import { RollbackOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

interface Props {}

export const QuestionLayout: React.FC<Props> = () => {
  const navigate = useNavigate();

  const { waitUserInfo } = useLoadUserInfo();

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
        {waitUserInfo ? (
          <Spin fullscreen tip={'加载用户信息中...'} />
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};
