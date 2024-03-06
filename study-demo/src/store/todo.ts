import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TodoItemInfo {
  id: string;
  title: string;
  completed: boolean;
}

const initialState: TodoItemInfo[] = [];

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoItemInfo>) => {
      return [action.payload, ...state];
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    toggleCompleted: (
      list: TodoItemInfo[],
      action: PayloadAction<{ id: string }>
    ) => {
      const { id: toggleId } = action.payload;
      return list.map((todo) => {
        const { id, completed } = todo;
        if (id !== toggleId) return todo;
        return { ...todo, completed: !completed };
      });
    },
  },
});
