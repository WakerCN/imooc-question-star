import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface QuestionDetail {
  id: string;
  title: string;
}

const initialState: QuestionDetail = {
  id: '',
  title: ''
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setDetail: (_, action: PayloadAction<QuestionDetail>) => {
      return action.payload;
    }
  }
});
