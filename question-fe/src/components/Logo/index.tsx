import { Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;
import styles from './index.module.scss';
import { ROUTE_PATH } from '@/routers';
interface Props {}

export const Logo: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleToHome = () => {
    navigate(ROUTE_PATH.HOME);
  };

  return (
    <Title onClick={handleToHome} className={styles['logo']}>
      ✨慧簿
    </Title>
  );
};
