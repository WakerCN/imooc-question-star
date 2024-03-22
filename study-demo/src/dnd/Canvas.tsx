/*
 * @Author       : 魏威
 * @Date         : 2024-03-20 14:59
 * @LastEditTime : 2024-03-21 11:14
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
  // const move = useWidgetStore.use.move();

  // const [activeId, setActiveId] = useState<string | null>(null);
  // const activeInfo = list.find((i) => i.id === activeId);

  // function handleDragStart(event: DragStartEvent) {
  //   setActiveId(event.active.id as string);
  // }

  // function handleDragEnd(event: DragEndEvent) {
  //   setActiveId(null);

  //   const { active, over } = event;
  //   if (!over) return;
  //   if (active.id !== over.id) {
  //     const oldIndex = list.findIndex((i) => i.id === active.id);
  //     const newIndex = list.findIndex((i) => i.id === over.id);
  //     move(oldIndex, newIndex);
  //   }
  // }

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
