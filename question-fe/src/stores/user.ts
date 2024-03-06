import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserInfo = {
  username: string;
  nickname: string;
};

const initialState: UserInfo = { username: '', nickname: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo: (_, action: PayloadAction<UserInfo>) => {
      return action.payload;
    },
    removeInfo: () => initialState
  }
});
