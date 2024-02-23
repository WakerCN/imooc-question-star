import '@/assets/styles/normalize.css';
import { themeConfig } from '@/assets/themes/index.ts';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN} theme={themeConfig}>
    <App />
  </ConfigProvider>
);
