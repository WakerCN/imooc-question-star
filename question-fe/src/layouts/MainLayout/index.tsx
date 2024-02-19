import { Button, Flex, Space } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { Logo } from '@/components/Logo';
import { ROUTE_PATH } from '@/routers';

export default function MainLayout() {
  const navigate = useNavigate();

  const handleToAuthor = () => {
    window.open('https://github.com/WakerCN');
  };

  const handleLogin = () => {
    navigate(ROUTE_PATH.LOGIN);
  };

  const handleRegister = () => {
    navigate(ROUTE_PATH.RESGISTER);
  };

  return (
    <section className={styles['main-layout']}>
      <Flex justify="space-between" align="center" className={styles['header']}>
        <Logo />
        <Space>
          <Button type="link" onClick={handleLogin}>
            登录
          </Button>
          <Button type="link" onClick={handleRegister}>
            注册
          </Button>
        </Space>
      </Flex>
      <main className={styles['main']}>
        <Outlet />
      </main>
      <footer className={styles['footer']}>
        <span style={{ marginRight: 100 }}>✨慧簿 ©2024 - present</span>
        Made by{' '}
        <Button type="link" onClick={handleToAuthor}>
          StarOne
        </Button>
      </footer>
    </section>
  );
}
