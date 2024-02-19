import { useTitle } from '@/hooks/common';
import { ROUTE_NAME, ROUTE_PATH } from '@/routers';
import {
  DeleteFilled,
  PlusOutlined,
  ProfileFilled,
  StarFilled
} from '@ant-design/icons';
import { Button, Divider, Space } from 'antd';
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

interface Props {}

export const ManagerLayout: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isQuestionPage = pathname === ROUTE_PATH.MANAGER;
  const isRecyleBinPage = pathname === ROUTE_PATH.RECYCLE;
  const isStarPage = pathname === ROUTE_PATH.STAR;

  useTitle(ROUTE_NAME[pathname]);

  const handleToQuestionList = () => {
    navigate({ pathname: ROUTE_PATH.MANAGER });
  };

  const handleToStarQuestionList = () => {
    navigate({ pathname: ROUTE_PATH.STAR });
  };

  const handleToRecyleBin = () => {
    navigate({ pathname: '/manager/recycle-bin' });
  };

  return (
    <section className={styles['manager-layout']}>
      <Space className={styles['menu']}>
        <Button
          type="primary"
          className={styles['btn']}
          icon={<PlusOutlined />}
          block
        >
          新建问卷
        </Button>
        <Divider className={styles['divider']} />
        <Button
          type={isQuestionPage ? 'default' : 'text'}
          className={styles['btn']}
          onClick={handleToQuestionList}
          icon={<ProfileFilled />}
        >
          我的问卷
        </Button>
        <Button
          type={isStarPage ? 'default' : 'text'}
          className={styles['btn']}
          onClick={handleToStarQuestionList}
          icon={<StarFilled />}
        >
          收藏问卷
        </Button>
        <Button
          type={isRecyleBinPage ? 'default' : 'text'}
          className={styles['btn']}
          icon={<DeleteFilled />}
          onClick={handleToRecyleBin}
        >
          回收站
        </Button>
      </Space>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </section>
  );
};
