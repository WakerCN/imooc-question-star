import { NotFound } from '@/components/404';
import MainLayout from '@/layouts/MainLayout';
import { ManagerLayout } from '@/layouts/ManagerLayout';
import { QuestionLayout } from '@/layouts/QuestionLayout';
import { Login } from '@/pages/Login/Login';
import { Register } from '@/pages/Login/Register';
import { Home } from '@/pages/home';
import { MyQuestions } from '@/pages/manager/MyQuestions';
import { RecycleBin } from '@/pages/manager/RecycleBin';
import { StarQuestions } from '@/pages/manager/StarQuestions';
import { QuestionAnalysis } from '@/pages/question/QuestionAnalysis';
import { QuestionEditor } from '@/pages/question/editor';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'manager',
        element: <ManagerLayout />,
        children: [
          {
            path: 'my-questions',
            element: <MyQuestions />
          },
          {
            path: 'star',
            element: <StarQuestions />
          },
          {
            path: 'recycle-bin',
            element: <RecycleBin />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      { path: 'edit/:id', element: <QuestionEditor /> },
      { path: 'analysis/:id', element: <QuestionAnalysis /> }
    ]
  },
  {
    path: '*',
    element: (
      <h1
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        404 NOT FOUND
      </h1>
    )
  }
]);

// router.subscribe((state) => {
//   const { location } = state;
//   document.title = `慧簿 | ${ROUTE_NAME[location.pathname]}`;
// });

export const ROUTE_PATH = {
  /** 首页 */
  HOME: '/',
  /** 登录 */
  LOGIN: '/login',
  /** 注册 */
  RESGISTER: '/register',
  /** 我的问卷 */
  MANAGER: '/manager/my-questions',
  /** 收藏问卷 */
  STAR: '/manager/star',
  /** 回收站 */
  RECYCLE: '/manager/recycle-bin',
  /** 问卷编辑 */
  EDIT: '/question/edit/',
  /** 问卷分析 */
  ANALYSIS: '/question/analysis/'
};

export const ROUTE_NAME = {
  [ROUTE_PATH.HOME]: '首页',
  [ROUTE_PATH.LOGIN]: '登录',
  [ROUTE_PATH.RESGISTER]: '注册',
  [ROUTE_PATH.MANAGER]: '我的问卷',
  [ROUTE_PATH.STAR]: '收藏问卷',
  [ROUTE_PATH.RECYCLE]: '回收站'
};
