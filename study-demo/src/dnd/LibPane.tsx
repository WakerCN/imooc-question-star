/*
 * @Author       : 魏威
 * @Date         : 2024-03-20 10:58
 * @LastEditTime : 2024-03-21 16:29
 * @LastEditors  : Waker
 * @Description  :
 */
import React from 'react';
import { DragItem } from './LibItem';
import styles from './index.module.scss';
import { libList } from './const';

interface Props {}

export const LibPane: React.FC<Props> = () => {
  return (
    <div className={styles['lib-pane']}>
      {libList.map((i) => (
        <DragItem key={i.name} info={i} />
      ))}
    </div>
  );
};
