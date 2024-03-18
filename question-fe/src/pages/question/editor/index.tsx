/*
 * @Author       : 魏威
 * @Date         : 2024-02-06 11:09
 * @LastEditTime : 2024-03-18 10:12
 * @LastEditors  : Waker
 * @Description  :
 */
import { ErrorPage } from '@/components/ErrorPage';
import { useTitle } from '@/hooks/common';
import { useLoadQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetConfig, WidgetInfo, getLibConfigByName } from '@/widgets';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Spin } from 'antd';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LeftPane } from './LeftPane';
import { WidgetItem } from './LeftPane/WidgetLibPane/WidgetItem';
import { QuestionCanvas } from './QuestionCanvas';
import { RightPane } from './RightPane';
import styles from './index.module.scss';

interface Props {}

export const QuestionEditor: React.FC<Props> = () => {
  const params = useParams();

  useTitle(`编辑 ${params.id}`);

  const { loading, error } = useLoadQuestionDetail();

  const dispatch = useAppDispatch();
  const { addWidgetById } = questionSlice.actions;

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 2 }
  });

  const sensors = useSensors(mouseSensor);

  const [activeId, setActiveId] = useState<string | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;
    if (over?.id) {
      const {
        data: { current: config }
      } = active;
      const newWidget: WidgetInfo = {
        fe_id: nanoid(18),
        title: (config as WidgetConfig).name,
        isHidden: false,
        isLocked: false,
        baseType: (config as WidgetConfig).baseType,
        props: (config as WidgetConfig).defaultProps
      };
      dispatch(addWidgetById({ id: over.id as string, widget: newWidget }));
    }
    setActiveId(null);
  }

  return (
    <div className={styles['editor-page']}>
      {loading ? (
        <Spin fullscreen tip={'正在加载问卷详细...'} />
      ) : error ? (
        <ErrorPage msg={error.message} />
      ) : (
        <div className={styles['edit-main']}>
          <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <LeftPane />
            <QuestionCanvas />
            <RightPane />
            {activeId && (
              <DragOverlay>
                <WidgetItem isOverlay data={getLibConfigByName(activeId)!} />
              </DragOverlay>
            )}
          </DndContext>
        </div>
      )}
    </div>
  );
};
