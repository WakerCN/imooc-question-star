/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 17:57
 * @LastEditTime : 2024-03-11 09:35
 * @LastEditors  : Waker
 * @Description  : 画布
 */
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { WidgetInfo, getConfigByBaseType } from '@/widgets';
import cx from 'classnames';
import React from 'react';
import styles from './index.module.scss';

interface Props {}

const genateCompoenent = (info: WidgetInfo) => {
  const { props, baseType } = info;
  const config = getConfigByBaseType(baseType);

  if (!config) {
    return null;
  }
  const { Component } = config;
  return <Component {...props} />;
};

export const QuestionCanvas: React.FC<Props> = () => {
  const { widgetList, selectedId } = useGetQuestionDetail();
  const dispatch = useAppDispatch();
  const { setSelectedId } = questionSlice.actions;

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    dispatch(setSelectedId(id));
  };

  const handlClickWhiteArea = () => {
    dispatch(setSelectedId(null));
  };

  return (
    <div
      className={styles['question-canvas-area']}
      onClick={handlClickWhiteArea}
    >
      <div className={styles['canvas']}>
        {widgetList.map((info) => {
          const { fe_id } = info;
          return (
            <div
              className={cx(styles['widget-wrap'], {
                [styles['active']]: selectedId === fe_id
              })}
              key={fe_id}
              onClick={(e) => handleClick(e, fe_id)}
            >
              <div className={styles['mask-wrap']}>
                {genateCompoenent(info)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
