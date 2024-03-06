import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment } from '@/store/counter';
import React from 'react';

interface Props {}

export const ReduxCountDemo: React.FC<Props> = () => {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>ReduexCountDemo:{count}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  );
};
