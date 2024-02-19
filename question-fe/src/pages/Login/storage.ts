import { LOCALSTORAGE_KEY } from '@/constants';
import { LoginForm } from './Login';

export function rememberLoginInfo(info: LoginForm) {
  localStorage.setItem(LOCALSTORAGE_KEY.USER_INFO, JSON.stringify(info));
}

export function clearLoginInfo() {
  localStorage.removeItem(LOCALSTORAGE_KEY.USER_INFO);
}

export function getLoginInfo(): LoginForm | null {
  const info = localStorage.getItem(LOCALSTORAGE_KEY.USER_INFO);
  return info ? JSON.parse(info) : null;
}
