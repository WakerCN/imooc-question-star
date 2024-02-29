import { LoginForm } from '@/pages/Login/Login';
import axiosInstance, { ResponseData } from '.';

const getInfo = async () => {
  const url = '/api/user/info';
  const data = (await axiosInstance.get(url)) as ResponseData;
  return data;
};

const login = async (userInfo: Partial<LoginForm>) => {
  const url = '/api/user/login';
  const data = (await axiosInstance.post(url, userInfo)) as ResponseData;
  return data;
};

const register = async (userInfo: Partial<LoginForm>) => {
  const url = '/api/user/register';
  const data = (await axiosInstance.post(url, userInfo)) as ResponseData;
  return data;
};

const logout = async () => {
  const url = '/api/user/logout';
  const data = (await axiosInstance.post(url)) as ResponseData;
  return data;
};

export const UserService = {
  getInfo,
  login,
  register,
  logout
};
