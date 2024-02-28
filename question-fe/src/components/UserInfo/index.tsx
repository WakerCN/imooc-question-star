import { ROUTE_PATH } from '@/routers';
import { Button, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {}

export const UserInfo: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTE_PATH.LOGIN);
  };

  const handleRegister = () => {
    navigate(ROUTE_PATH.RESGISTER);
  };
  return (
    <Space>
      <Button type="link" onClick={handleLogin}>
        登录
      </Button>
      <Button type="link" onClick={handleRegister}>
        注册
      </Button>
    </Space>
  );
};
