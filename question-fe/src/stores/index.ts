import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});

export default store;

// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
