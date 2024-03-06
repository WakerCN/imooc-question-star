import { ROUTE_PATH, noNeedUserInfo } from '@/routers';
import { UserService } from '@/services/user';
import { UserInfo, userSlice } from '@/stores/user';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux';

export const useGetUserInfo = () => useAppSelector((state) => state.user);

export const useLoadUserInfo = () => {
  const { username } = useGetUserInfo();
  const dispatch = useAppDispatch();
  const { setInfo } = userSlice.actions;
  const naviagte = useNavigate();
  const { pathname } = useLocation();

  const { loading: waitUserInfo, run: loadInfo } = useRequest(
    UserService.getInfo,
    {
      manual: true,
      onSuccess: (res) => {
        dispatch(setInfo(res as UserInfo));
      },
      onError: () => {
        naviagte(ROUTE_PATH.LOGIN);
      }
    }
  );

  useEffect(() => {
    if (username) {
      return;
    }
    if (noNeedUserInfo(pathname)) {
      return;
    }
    loadInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, pathname]);

  return { waitUserInfo };
};
