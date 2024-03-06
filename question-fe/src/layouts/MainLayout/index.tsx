import { Logo } from '@/components/Logo';
import { UserInfo } from '@/components/UserInfo';
import { useTransitionRef } from '@/hooks/transition';
import { useLoadUserInfo } from '@/hooks/user';
import { ROUTE_PATH } from '@/routers';
import { Button, Flex, Spin } from 'antd';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from './index.module.scss';

export default function MainLayout() {
  const { nodeRef, currentOutlet, location } = useTransitionRef();

  const { waitUserInfo } = useLoadUserInfo();

  const handleToAuthor = () => {
    window.open('https://github.com/WakerCN');
  };

  const transitionRoute = [
    ROUTE_PATH.HOME,
    ROUTE_PATH.LOGIN,
    ROUTE_PATH.RESGISTER,
    ROUTE_PATH.MANAGER
  ];

  return (
    <section className={styles['main-layout']}>
      <Flex justify="space-between" align="center" className={styles['header']}>
        <Logo />
        <UserInfo />
      </Flex>
      <main className={styles['main']}>
        {waitUserInfo ? (
          <Spin tip="加载用户信息中..." fullscreen />
        ) : transitionRoute.includes(location.pathname) ? (
          <SwitchTransition>
            <CSSTransition
              ref={nodeRef}
              key={location.pathname}
              timeout={500}
              classNames={'fade'}
            >
              {() => (
                <div ref={nodeRef} className="router-wrap">
                  {currentOutlet}
                </div>
              )}
            </CSSTransition>
          </SwitchTransition>
        ) : (
          <div className="router-wrap">{currentOutlet}</div>
        )}
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
