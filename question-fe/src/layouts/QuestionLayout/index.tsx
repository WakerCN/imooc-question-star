/*
 * @Author       : 魏威
 * @Date         : 2024-02-05 13:55
 * @LastEditTime : 2024-03-28 16:48
 * @LastEditors  : Waker
 * @Description  :
 */
import { useLoadUserInfo } from '@/hooks/user';
import { TopPane } from '@/pages/question/editor/TopPane';
import { RollbackOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { ROUTE_PATH } from '@/routers';
import { AnalysisHeader } from '@/pages/question/analysis/AnalysisHeader';

interface Props {}

export const QuestionLayout: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isEditor = pathname.includes(ROUTE_PATH.EDIT);
  const isAnalysis = pathname.includes(ROUTE_PATH.ANALYSIS);

  const { waitUserInfo } = useLoadUserInfo();

  const handleBack = () => {
    navigate(ROUTE_PATH.MANAGER);
  };

  return (
    <div className={styles['quesion-layout']}>
      <header className={styles['header']}>
        <Button className={styles['back-btn']} type="text" onClick={handleBack}>
          <RollbackOutlined />
        </Button>
        <div className={styles['top-area']}>
          {isEditor && <TopPane />}
          {isAnalysis && <AnalysisHeader />}
        </div>
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
