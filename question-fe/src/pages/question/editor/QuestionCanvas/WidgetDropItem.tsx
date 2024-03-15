/*
 * @Author       : 魏威
 * @Date         : 2024-03-15 17:19
 * @LastEditTime : 2024-03-15 18:00
 * @LastEditors  : Waker
 * @Description  :
 */
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetInfo, getConfigByBaseType } from '@/widgets';
import { useDroppable } from '@dnd-kit/core';
import cx from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface WidgetDropItem {
  data: WidgetInfo;
}

const genateCompoenent = (info: WidgetInfo) => {
  const { props, baseType } = info;
  const config = getConfigByBaseType(baseType);

  if (!config) {
    return null;
  }
  const { Component } = config;
  return <Component {...props} />;
};

export const WidgetDropItem: React.FC<WidgetDropItem> = (props) => {
  const { data } = props;
  const { isLocked, fe_id } = data;

  const { selectedId } = useGetQuestionDetail();
  const dispatch = useAppDispatch();
  const { setSelectedId } = questionSlice.actions;

  const { setNodeRef, isOver, rect } = useDroppable({
    id: fe_id
  });

  if (data.title === '标题1') {
    if (
      rect.current?.top &&
      (rect.current.height - 40) / 2 < rect.current.top
    ) {
      console.log('top');
    } else {
      console.log('bottom');
    }
  }

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    dispatch(setSelectedId(id));
  };

  return (
    <div className={styles['widget-drop-wrap']}>
      <div
        ref={setNodeRef}
        className={cx(styles['widget-wrap'], {
          [styles['active']]: selectedId === fe_id,
          [styles['locked']]: isLocked
        })}
        key={fe_id}
        onClick={(e) => handleClick(e, fe_id)}
      >
        <div className={styles['mask-wrap']}>{genateCompoenent(data)}</div>
      </div>
      {isOver && <div className={styles['drop-point']} />}
    </div>
  );
};
