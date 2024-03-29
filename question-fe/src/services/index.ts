import { message } from '@/components/AntdStatic';
import { getToken } from '@/pages/Login/storage';
import axios from 'axios';

export interface ResponseInfo {
  errno: number;
  msg: string;
  data?: ResponseData;
}

export interface ResponseData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const axiosInstance = axios.create({
  timeout: 10 * 1000
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* 响应拦截，错误统一处理
=========================================== */
axiosInstance.interceptors.response.use((res) => {
  const resData = res.data || {};
  const { data, errno, msg } = resData;

  if (errno !== 0) {
    message.error(msg);
    throw new Error(msg);
  }

  return data;
});

export default axiosInstance;
