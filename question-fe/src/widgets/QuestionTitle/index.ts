/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 14:18
 * @LastEditTime : 2024-03-13 17:34
 * @LastEditors  : Waker
 * @Description  :
 */
import { FC } from 'react';
import { WidgetConfig, WidgetProps } from '..';
import { AttributeConfig } from './AttributeConfig.tsx';
import { QuestionTitle } from './Component.tsx';
import { questionTitleDefaultProps } from './interface.ts';

export const QuestionTitleConfig: WidgetConfig = {
  name: '标题',
  baseType: 'title',
  Component: QuestionTitle as FC<WidgetProps>,
  iconKey: 'baseType-title',
  AttributeConfig,
  defaultProps: questionTitleDefaultProps
};

export const QuestionTitleLevel1Config: WidgetConfig = {
  ...QuestionTitleConfig,
  name: '一级标题',
  iconKey: 'lib-h1',
  defaultProps: {
    ...questionTitleDefaultProps,
    level: 1
  }
};

export const QuestionTitleLevel2Config: WidgetConfig = {
  ...QuestionTitleConfig,
  name: '二级标题',
  iconKey: 'lib-h2',
  defaultProps: {
    ...questionTitleDefaultProps,
    title: '二级标题',
    level: 2
  }
};

export const QuestionTitleLevel3Config: WidgetConfig = {
  ...QuestionTitleConfig,
  name: '三级标题',
  iconKey: 'lib-h3',
  defaultProps: {
    ...questionTitleDefaultProps,
    title: '三级标题',
    level: 3
  }
};
