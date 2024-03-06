import { useAppDispatch, useAppSelector } from '@/store';
import { todoSlice } from '@/store/todo';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {}

export const TodoReduxDemo: React.FC<Props> = () => {
  const todoList = useAppSelector((state) => state.todo);

  const dispatch = useAppDispatch();
  const { addTodo, deleteTodo, toggleCompleted } = todoSlice.actions;

  const handleAdd = () => {
    const id = uuidv4(); // 生成一个随机的ID
    dispatch(addTodo({ id, title: `new todo ${id}`, completed: false }));
  };

  const handleDelete = (id: string) => dispatch(deleteTodo({ id }));

  const handleToggle = (id: string) => dispatch(toggleCompleted({ id }));

  return (
    <div>
      <button onClick={handleAdd}>add</button>
      <ul>
        {todoList.map((todo) => {
          const { id, title, completed } = todo;
          return (
            <li style={{ marginBottom: 10 }} key={id}>
              <span
                style={{ textDecoration: completed ? 'line-through' : 'none' }}
                onClick={() => handleToggle(id)}
              >
                {title}
              </span>
              <button
                style={{ marginLeft: 20 }}
                onClick={() => handleDelete(id)}
              >
                删除
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
