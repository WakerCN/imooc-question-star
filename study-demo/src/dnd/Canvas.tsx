/*
 * @Author       : 魏威
 * @Date         : 2024-03-20 14:59
 * @LastEditTime : 2024-03-25 14:00
 * @LastEditors  : Waker
 * @Description  : 画布组件
 */

import { useWidgetStore } from '@/zusand';
import { SortableContext } from '@dnd-kit/sortable';
import React from 'react';
import { WidgetItem } from './WidgetItem';
import styles from './index.module.scss';

interface Props {}

export const Canvas: React.FC<Props> = () => {
  const list = useWidgetStore.use.list();

  return (
    <SortableContext items={list.map((item) => item.id)}>
      <div className={styles['canvas']}>
        {list.map((info) => (
          <WidgetItem key={info.id} info={info} />
        ))}
      </div>
    </SortableContext>
  );
};
