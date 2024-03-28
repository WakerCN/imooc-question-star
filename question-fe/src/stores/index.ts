/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 10:57
 * @LastEditTime : 2024-03-28 15:23
 * @LastEditors  : Waker
 * @Description  :
 */
import { configureStore } from '@reduxjs/toolkit';
import { questionSlice } from './question';
import { userSlice } from './user';

import undoable, { includeAction } from 'redux-undo';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    question: undoable(questionSlice.reducer, {
      limit: 50,
      filter: includeAction([
        'question/addWidget',
        'question/addWidgetById',
        'question/updateProps',
        'question/deleteWidget',
        'question/toggleWidgetVisiable',
        'question/toggleWidgetLock',
        'question/modifyWidgetTitle',
        'question/pasteWidget',
        'question/moveWidget'
      ])
    })
  }
});

export default store;

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
