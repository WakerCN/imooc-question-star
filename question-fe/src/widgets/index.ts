/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 16:32
 * @LastEditTime : 2024-03-11 17:44
 * @LastEditors  : Waker
 * @Description  : widget 组件入口文件
 */

import { FC } from 'react';
import QuestionInputConfig from './QuestionInput';
import { QuestionInputProps } from './QuestionInput/interface';
import {
  QuestionTitleConfig,
  QuestionTitleLevel1Config,
  QuestionTitleLevel2Config,
  QuestionTitleLevel3Config
} from './QuestionTitle';
import { QuestionTitleProps } from './QuestionTitle/interface';

export type WidgetType = 'title1' | 'title2' | 'title3' | 'input';

export type WidgetBaseType =
  | 'title'
  | 'input'
  | 'radio'
  | 'checkbox'
  | 'select';

export type WidgetProps = QuestionTitleProps | QuestionInputProps;

export interface WidgetInfo {
  fe_id: string;
  baseType: WidgetBaseType;
  title: string;
  props: WidgetProps;
}

export interface WidgetConfig {
  /** 组件中文名 */
  name: string;
  baseType: WidgetBaseType;
  Component: FC<WidgetProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AttributeConfig: FC<{ value: any; onChange?: (value: any) => void }>;
  defaultProps: WidgetProps;
}

/** 基本类型配置 */
export const widgetBaseConfigList: WidgetConfig[] = [
  QuestionTitleConfig,
  QuestionInputConfig
];

/** 所有组件配置 */
export const widgetConfigList: WidgetConfig[] = [
  QuestionTitleLevel1Config,
  QuestionTitleLevel2Config,
  QuestionTitleLevel3Config,
  QuestionInputConfig
];

/** 根据组件类型获取组件基本类型的config */
export const getConfigByBaseType = (baseType: WidgetBaseType) => {
  return widgetBaseConfigList.find((item) => item.baseType === baseType);
};

/** 根据组件类型获取组件的config */
export const getLibConfigByName = (name: string) => {
  return widgetConfigList.find((item) => item.name === name);
};

export type WidgetLibCategory = 'title' | 'input';

/** 组件库信息 */
export interface WidgetLibGroup {
  key: WidgetLibCategory;
  title: string;
  components: WidgetConfig[];
}

/** 组件库分组对象 */
export const widgetLibGroup: WidgetLibGroup[] = [
  {
    key: 'title',
    title: '标题',
    components: [
      QuestionTitleLevel1Config,
      QuestionTitleLevel2Config,
      QuestionTitleLevel3Config
    ]
  },
  {
    key: 'input',
    title: '输入',
    components: [QuestionInputConfig]
  }
];
