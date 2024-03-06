import { ROUTE_PATH, isLoginAndRegister, noNeedUserInfo } from '@/routers';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUserInfo } from './user';

export const useLoginGuard = (waitUserInfo: boolean) => {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (waitUserInfo) {
      return;
    }

    // 已登录
    if (username) {
      if (isLoginAndRegister(pathname)) navigate(ROUTE_PATH.MANAGER);
      return;
    }

    // 未登录
    if (noNeedUserInfo(pathname)) {
      return;
    } else {
      navigate(ROUTE_PATH.LOGIN);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, pathname]);
};
