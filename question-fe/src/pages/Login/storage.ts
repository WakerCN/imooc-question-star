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

// ========== token相关 start ========== //
export function setToken(token: string) {
  localStorage.setItem(LOCALSTORAGE_KEY.TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(LOCALSTORAGE_KEY.TOKEN);
}

export function removeToken() {
  localStorage.removeItem(LOCALSTORAGE_KEY.TOKEN);
}
// =========== token相关 end =========== //
