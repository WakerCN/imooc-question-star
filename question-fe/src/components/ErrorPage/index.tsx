import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { ROUTE_PATH } from '@/routers';
interface Props {
  msg: string;
}

export const ErrorPage: React.FC<Props> = (props) => {
  const { msg = '页面出错了' } = props;

  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTE_PATH.MANAGER);
  };

  return (
    <section className={styles['error-page']}>
      <Result
        status="error"
        title={'页面出错了'}
        subTitle={msg}
        extra={[
          <Button onClick={handleBackHome} type="primary">
            回到首页
          </Button>
        ]}
      />
    </section>
  );
};
