import React, { useEffect, useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { v4 as uuidv4 } from 'uuid';
import { produce } from 'immer';
import styles from '@/demo/index.module.scss';

interface Props {}

export interface ListInfo {
  id: string;
  name: string;
  isPublished: boolean;
}

export const ListDemo: React.FC<Props> = () => {
  const [datasource, setDatasource] = useState<ListInfo[]>([]);

  useEffect(() => {
    console.log('组件创建');

    return () => {
      console.log('组件销毁');
    };
  }, []);

  const handleAdd = () => {
    const id = uuidv4();
    // setDatasource(
    //   datasource.concat({ id, name: `问卷 ${id}`, isPublished: false })
    // );

    // immer
    setDatasource(
      produce((datasource) => {
        datasource.push({ id, name: `问卷 ${id}`, isPublished: false });
      })
    );
  };

  const handleDelete = (id: string) => {
    // setDatasource(datasource.filter((item) => item.id !== id));

    // immer
    setDatasource(
      produce((ds) => {
        const index = ds.findIndex((item) => item.id === id);
        ds.splice(index, 1);
      })
    );
  };

  const handlePublish = (id: string) => {
    // setDatasource(
    //   datasource.map((item) =>
    //     item.id === id ? { ...item, isPublished: true } : item
    //   )
    // );

    // immer
    setDatasource(
      produce((ds) => {
        const info = ds.find((item) => item.id === id);
        if (info) {
          info.isPublished = true;
        }
      })
    );
  };

  return (
    <div>
      <div className={styles['add-btn']}>
        <button onClick={handleAdd}>add item</button>
      </div>
      {datasource.map((item) => (
        <QuestionCard
          key={item.id}
          info={item}
          deleteItem={handleDelete}
          publishItem={handlePublish}
        />
      ))}
    </div>
  );
};
