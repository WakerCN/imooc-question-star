import React, { useState } from 'react';
import { produce } from 'immer';

interface Props {}

export const ImmerDemo: React.FC<Props> = () => {
  const [list, setList] = useState([
    { title: 'React', done: false },
    { title: 'Zustant', done: false },
  ]);

  const hanldeOperate = () => {
    setList(
      produce(list, (list) => {
        list[0].done = true;
        list.push({ title: 'Redux', done: false });
      })
    );
  };

  return (
    <div>
      <button onClick={hanldeOperate}>operate</button>
      {list.map((item) => (
        <li key={item.title}>
          {item.done ? '✔️' : '❌'} {item.title}
        </li>
      ))}
    </div>
  );
};
