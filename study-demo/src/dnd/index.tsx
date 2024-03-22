/*
 * @Author       : 魏威
 * @Date         : 2024-03-20 10:56
 * @LastEditTime : 2024-03-22 10:38
 * @LastEditors  : Waker
 * @Description  : DND demo
 */
import { useWidgetStore } from '@/zusand';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import React, { useState } from 'react';
import { Canvas } from './Canvas';
import { LibBaseItem } from './LibBaseItem';
import { LibPane } from './LibPane';
import { WidgetBaseItem } from './WidgetBaseItem';
import { libList } from './const';
import styles from './index.module.scss';
interface Props {}

export const DndKitDemo: React.FC<Props> = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const widgetList = useWidgetStore.use.list();
  const move = useWidgetStore.use.move();
  const add = useWidgetStore.use.add();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    const activeData = active.data.current;
    const overData = over.data.current;
    if (activeData?.type === 'lib' && overData?.type === 'widget') {
      add(over.id as string, active.id as string);
      // 添加组件
      return;
    }
    if (activeData?.type === 'widget' && overData?.type === 'widget') {
      if (active.id !== over.id) {
        const oldIndex = widgetList.findIndex((i) => i.id === active.id);
        const newIndex = widgetList.findIndex((i) => i.id === over.id);
        move(oldIndex, newIndex);
      }
      return;
    }
  };

  const activeWidget = widgetList.find((item) => item.id === activeId);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles['dnd']}>
        <LibPane />
        <Canvas />
      </div>
      {libList.find((l) => l.name === activeId) ? (
        <DragOverlay dropAnimation={null}>
          <LibBaseItem
            info={libList.find((item) => item.name === activeId)!}
            isOverlay={true}
          />
        </DragOverlay>
      ) : activeWidget ? (
        <DragOverlay
          dropAnimation={null}
          adjustScale={true}
          modifiers={[restrictToVerticalAxis]}
        >
          <WidgetBaseItem info={activeWidget} isOverlay />
        </DragOverlay>
      ) : null}
    </DndContext>
  );
};
