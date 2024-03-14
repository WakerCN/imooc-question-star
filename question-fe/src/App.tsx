/*
 * @Author       : 魏威
 * @Date         : 2024-02-01 14:22
 * @LastEditTime : 2024-03-13 10:38
 * @LastEditors  : Waker
 * @Description  :
 */
import '@/assets/styles/index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routers';

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
