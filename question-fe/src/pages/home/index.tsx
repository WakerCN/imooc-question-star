import React from 'react';
import styles from './index.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '@/routers';
import { useTitle } from '@/hooks/common';

interface Props {}

export const Home: React.FC<Props> = () => {
  useTitle('首页');

  const naviagte = useNavigate();

  const handleStart = () => {
    naviagte(ROUTE_PATH.MANAGER);
  };

  return (
    <div className={styles['home-page']}>
      <Button type="primary" className={styles['start']} onClick={handleStart}>
        开始使用
      </Button>
    </div>
  );
};
