import React, { useState } from 'react';

interface Props {}

export const StateDemo: React.FC<Props> = () => {
  const [count, setCount] = useState<number>(0);
  const [userInfo, setUserInfo] = useState({ name: 'starOne', age: 25 });

  const onClick = () => {
    console.log('before setState: ', count);
    setCount((count) => count + 1);
    console.log('after setState:  ', count);
  };

  const handleAddAge = () => {
    setUserInfo({ ...userInfo, age: userInfo.age + 1 });
  };

  return (
    <div>
      <button onClick={onClick}>Add {count}</button>
      <div>
        <h2>{JSON.stringify(userInfo)}</h2>
        <button onClick={handleAddAge}>Add age</button>
      </div>
    </div>
  );
};
