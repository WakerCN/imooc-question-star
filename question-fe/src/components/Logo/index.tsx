import { useGetUserInfo } from '@/hooks/user';
import { ROUTE_PATH } from '@/routers';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
const { Title } = Typography;
interface Props {}

export const Logo: React.FC<Props> = () => {
  const navigate = useNavigate();
  const userInfo = useGetUserInfo();

  const [linkPath, setLinkPath] = useState(ROUTE_PATH.HOME);

  useEffect(() => {
    setLinkPath(userInfo.username ? ROUTE_PATH.MANAGER : ROUTE_PATH.HOME);
  }, [userInfo.username]);

  const handleToHome = () => {
    navigate(linkPath);
  };

  return (
    <Title onClick={handleToHome} className={styles['logo']}>
      ✨慧簿
    </Title>
  );
};
