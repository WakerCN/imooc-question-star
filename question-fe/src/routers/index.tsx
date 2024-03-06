import { NotFound } from '@/components/404';
import MainLayout from '@/layouts/MainLayout';
import { ManagerLayout } from '@/layouts/ManagerLayout';
import { QuestionLayout } from '@/layouts/QuestionLayout';
import { Home } from '@/pages/home';
import { Login } from '@/pages/Login/Login';
import { Register } from '@/pages/Login/Register';
import { MyQuestions } from '@/pages/manager/MyQuestions';
import { RecycleBin } from '@/pages/manager/RecycleBin';
import { StarQuestions } from '@/pages/manager/StarQuestions';
import { QuestionEditor } from '@/pages/question/editor';
import { QuestionAnalysis } from '@/pages/question/QuestionAnalysis';
import { TreeTools } from '@/utils/tree';
import _ from 'lodash';
import { createRef } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
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
];

const routesWithNodeRef = TreeTools.processTree(
  _.cloneDeep(routesConfig),
  (route) => ({
    ...route,
    nodeRef: createRef()
  })
);

export const router = createBrowserRouter(routesWithNodeRef);

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

export const isLoginAndRegister = (pathname: string) => {
  return [ROUTE_PATH.LOGIN, ROUTE_PATH.RESGISTER].includes(pathname);
};

export const noNeedUserInfo = (pathname: string) => {
  return [ROUTE_PATH.HOME, ROUTE_PATH.LOGIN, ROUTE_PATH.RESGISTER].includes(
    pathname
  );
};
