/*
 * @Author       : 魏威
 * @Date         : 2024-02-01 14:22
 * @LastEditTime : 2024-03-13 10:44
 * @LastEditors  : Waker
 * @Description  :
 */
import '@/assets/styles/normalize.css';
import { themeConfig } from '@/assets/themes/index.ts';
import AntdStaticMethodComponents from '@/components/AntdStatic.ts';
import { App as AntApp, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App.tsx';
import store from './stores/index.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      <AntApp
        style={{ width: '100%', height: '100%' }}
        notification={{ maxCount: 3 }}
      >
        <AntdStaticMethodComponents />
        <App />
      </AntApp>
    </ConfigProvider>
  </ReduxProvider>
);
