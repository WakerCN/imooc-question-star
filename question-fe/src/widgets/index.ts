/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 16:32
 * @LastEditTime : 2024-03-07 17:15
 * @LastEditors  : Waker
 * @Description  : widget 组件入口文件
 */

import { FC } from 'react';
import { QuestionInputProps } from './QuestionInput/interface';
import { QuestionTitleProps } from './QuestionTitle/interface';
import QuestionInputConfig from './QuestionInput';
import { QuestionTitleConfig } from './QuestionTitle';

export type WidgetType = 'title' | 'input' | 'radio' | 'checkbox' | 'select';

export type WidgetProps = QuestionTitleProps | QuestionInputProps;

export interface WidgetInfo {
  fe_id: string;
  type: WidgetType;
  title: string;
  props: WidgetProps;
}

export interface WidgetConfig {
  title: string;
  type: WidgetType;
  Component: FC<WidgetProps>;
  defaultProps: WidgetProps;
}

/** 所有组件配置 */
export const widgetConfigList: WidgetConfig[] = [
  QuestionTitleConfig,
  QuestionInputConfig
];

export const getComponentConfigByType = (type: WidgetType) => {
  return widgetConfigList.find((item) => item.type === type);
};
