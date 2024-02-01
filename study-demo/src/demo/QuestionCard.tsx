import React, { useEffect } from 'react';
import { ListInfo } from './ListDemo';

interface Props {
  info: ListInfo;
  deleteItem: (id: string) => void;
  publishItem: (id: string) => void;
}

export const QuestionCard: React.FC<Props> = (props) => {
  const { info, deleteItem, publishItem } = props;
  const { id, name, isPublished } = info;

  useEffect(() => {
    console.log(`组件 ${name} 创建`);

    return () => {
      console.log(`组件 ${name} 销毁`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 10, userSelect: 'none' }}>
      <span style={{ display: 'inline-block', textAlign: 'left', width: 500 }}>
        {name}
      </span>
      {isPublished ? (
        <span style={{ color: 'green' }}>已发布</span>
      ) : (
        <span style={{ color: 'gray' }}>未发布</span>
      )}
      <button
        style={{ marginLeft: 10 }}
        disabled={isPublished}
        onClick={() => publishItem(id)}
      >
        publish
      </button>
      <button style={{ marginLeft: 10 }} onClick={() => deleteItem(id)}>
        Delete
      </button>
    </div>
  );
};
