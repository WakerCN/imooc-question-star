import { useAppDispatch } from '@/hooks/redux';
import { useGetUserInfo } from '@/hooks/user';
import { removeToken } from '@/pages/Login/storage';
import { ROUTE_PATH } from '@/routers';
import { UserService } from '@/services/user';
import { userSlice } from '@/stores/user';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Avatar, Button, Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { message, notification } from '../AntdStatic';
import styles from './index.module.scss';

interface Props {}

export const UserInfo: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTE_PATH.LOGIN);
  };

  const handleRegister = () => {
    navigate(ROUTE_PATH.RESGISTER);
  };

  const userInfo = useGetUserInfo();
  const dispatch = useAppDispatch();
  const { removeInfo } = userSlice.actions;

  const { runAsync: logout } = useRequest(UserService.logout, {
    manual: true,
    onBefore: () => {
      message.loading({
        key: 'logout',
        content: '正在退出...'
      });
    },
    onSuccess: () => {
      dispatch(removeInfo());
      removeToken();
      message.destroy('logout');
    }
  });

  const items: MenuProps['items'] = [
    {
      label: (
        <Space>
          <UserOutlined />
          个人中心
        </Space>
      ),
      key: 'person-center',
      onClick: () => {
        notification.info({ message: '功能正在开发中... 🥰' });
      }
    },
    {
      label: (
        <Space>
          <LogoutOutlined />
          退出登录
        </Space>
      ),
      key: 'logout',
      danger: true,
      onClick: logout
    }
  ];

  return userInfo.username ? (
    <Dropdown menu={{ items }}>
      <Space className={styles['user-info']}>
        <Avatar icon={<UserOutlined />} />
        {userInfo.username}
      </Space>
    </Dropdown>
  ) : (
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
