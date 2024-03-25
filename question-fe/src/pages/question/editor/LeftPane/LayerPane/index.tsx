import { useGetQuestionDetail } from '@/hooks/question';
import { WidgetInfo } from '@/widgets';
import { List, ListProps } from 'antd';
import React from 'react';
import { LayerItem } from './LayerItem';
import styles from './index.module.scss';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToParentElement
} from '@dnd-kit/modifiers';
import { questionSlice } from '@/stores/question';
import { useAppDispatch } from '@/hooks/redux';

interface LayerPaneProps {}

export const LayerPane: React.FC<LayerPaneProps> = () => {
  const { widgetList } = useGetQuestionDetail();
  const { moveWidget } = questionSlice.actions;
  const dispatch = useAppDispatch();

  const renderItem: ListProps<WidgetInfo>['renderItem'] = (item) => {
    return <LayerItem info={item} />;
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;
    dispatch(
      moveWidget({
        sourceId: active.data.current!.id,
        targetId: over.data.current!.id
      })
    );
  };

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={widgetList.map((item) => `layer-${item.fe_id}`)}>
        <List
          className={styles['layer-pane']}
          dataSource={widgetList}
          renderItem={renderItem}
          bordered={false}
        />
      </SortableContext>
    </DndContext>
  );
};
