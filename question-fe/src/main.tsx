import '@/assets/styles/normalize.css';
import { themeConfig } from '@/assets/themes/index.ts';
import { ConfigProvider, App as AntApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import AntdStaticMethodComponents from '@/components/AntdStatic.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN} theme={themeConfig}>
    <AntApp style={{ width: '100%', height: '100%' }}>
      <AntdStaticMethodComponents />
      <App />
    </AntApp>
  </ConfigProvider>
);
