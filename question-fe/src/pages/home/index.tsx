import { useTitle } from '@/hooks/common';
import { ROUTE_PATH } from '@/routers';
import { Button } from 'antd';
import confetti from 'canvas-confetti';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

interface Props {}

export const Home: React.FC<Props> = () => {
  useTitle('首页');

  const naviagte = useNavigate();

  const handleStart = async () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
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
