/*
 * @Author       : 魏威
 * @Date         : 2024-02-06 11:09
 * @LastEditTime : 2024-03-25 13:47
 * @LastEditors  : Waker
 * @Description  :
 */
import { ErrorPage } from '@/components/ErrorPage';
import { useTitle } from '@/hooks/common';
import { useLoadQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
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
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { LeftPane } from './LeftPane';
import { LibBaseItem } from './LeftPane/WidgetLibPane/LibBaseItem';
import { QuestionCanvas } from './QuestionCanvas';
import { SortOverlay } from './QuestionCanvas/SortOverlay';
import { RightPane } from './RightPane';
import styles from './index.module.scss';

interface Props {}

export const QuestionEditor: React.FC<Props> = () => {
  const params = useParams();

  useTitle(`编辑 ${params.id}`);

  const { loading, error } = useLoadQuestionDetail();

  const { addWidgetById, moveWidget, setSelectedId } = questionSlice.actions;
  const dispach = useAppDispatch();

  const [activeObj, setActiveObj] = useState<Active | null>(null);
  const isDragLib = activeObj?.data.current?.type === 'lib';
  const isDragWidget = activeObj?.data.current?.type === 'widget';
  const activeInfo = activeObj?.data.current?.info;

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 2 }
  });

  const sensors = useSensors(mouseSensor);

  function handleDragStart(event: DragStartEvent) {
    setActiveObj(event.active);
    const {
      data: { current: activeData }
    } = event.active;
    const { info: activeInfo, type: activeType } = activeData!;
    if (activeType === 'widget') {
      dispach(setSelectedId(activeInfo.fe_id));
    }
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

    /* 添加组件到画布
    =========================================== */
    if (overType === 'canvas' && activeType === 'lib') {
      console.log('拖拽到画布');
      return;
    }

    /* 添加组件
    =========================================== */
    if (overType === 'widget' && activeType === 'lib') {
      const { baseType, name, defaultProps } = activeInfo;
      const { info } = overData!;
      const tagetId = info.fe_id;
      dispach(
        addWidgetById({
          id: tagetId,
          widget: {
            fe_id: nanoid(18),
            baseType,
            title: name,
            isHidden: false,
            isLocked: false,
            props: defaultProps
          }
        })
      );
      return;
    }

    /* 移动组件位置
    =========================================== */
    if (activeType === 'widget' && overType === 'widget') {
      dispach(
        moveWidget({
          sourceId: activeInfo.fe_id,
          targetId: overInfo.fe_id
        })
      );
      return;
    }
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
            {/* 根据类型 渲染overlay */}
            {activeObj && isDragLib && (
              <DragOverlay>
                <LibBaseItem info={activeInfo} isOverlay />
              </DragOverlay>
            )}
            {activeObj && isDragWidget && <SortOverlay info={activeInfo} />}
          </DndContext>
        </div>
      )}
    </div>
  );
};
