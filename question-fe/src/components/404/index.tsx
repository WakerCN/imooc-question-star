import { ROUTE_PATH } from '@/routers';
import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

interface Props {}

export const NotFound: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleToHome = () => {
    navigate(ROUTE_PATH.MANAGER); // 导航到首页
  };

  return (
    <div className={styles['not-found']}>
      <Result
        status="404"
        title="404"
        subTitle="你访问的页面不存在。"
        extra={
          <Button type="primary" onClick={handleToHome}>
            返回首页
          </Button>
        }
      />
    </div>
  );
};
