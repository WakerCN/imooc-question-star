/*
 * @Author       : 魏威
 * @Date         : 2024-02-06 11:09
 * @LastEditTime : 2024-03-22 14:33
 * @LastEditors  : Waker
 * @Description  :
 */
import { ErrorPage } from '@/components/ErrorPage';
import { useTitle } from '@/hooks/common';
import { useLoadQuestionDetail } from '@/hooks/question';
import {
  Active,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { Spin } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LeftPane } from './LeftPane';
import { LibBaseItem } from './LeftPane/WidgetLibPane/LibBaseItem';
import { QuestionCanvas } from './QuestionCanvas';
import { WidgetBaseItem } from './QuestionCanvas/WidgetBaseItem';
import { RightPane } from './RightPane';
import styles from './index.module.scss';

interface Props {}

export const QuestionEditor: React.FC<Props> = () => {
  const params = useParams();

  useTitle(`编辑 ${params.id}`);

  const { loading, error } = useLoadQuestionDetail();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 2 }
  });

  const sensors = useSensors(mouseSensor);

  const [activeObj, setActiveObj] = useState<Active | null>(null);

  function handleDragStart(event: DragStartEvent) {
    setActiveObj(event.active);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveObj(null);
    const { over, active } = event;
    if (!over || !active) return;
    const {
      data: { current: overData }
    } = over;
    const {
      data: { current: activeData }
    } = active;
    const { info: activeInfo, type: activeType } = activeData!;
    const { info: overInfo, type: overType } = overData!;
    if (overType === 'widget' && activeType === 'lib') {
      console.log('add', activeInfo);
      return;
    }
    if (activeType === 'widget' && overType === 'widget') {
      console.log('move', overInfo);
    }
  }

  const isDragLib = activeObj?.data.current?.type === 'lib';
  const isDragWidget = activeObj?.data.current?.type === 'widget';

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
            {/* 根据类型 渲染overlay */}
            {activeObj && isDragLib && (
              <DragOverlay>
                <LibBaseItem info={activeObj.data.current?.info} isOverlay />
              </DragOverlay>
            )}
            {activeObj && isDragWidget && (
              <DragOverlay>
                <WidgetBaseItem info={activeObj.data.current?.info} isOverlay />
              </DragOverlay>
            )}
          </DndContext>
        </div>
      )}
    </div>
  );
};
