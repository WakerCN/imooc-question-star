/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 16:32
 * @LastEditTime : 2024-03-13 16:53
 * @LastEditors  : Waker
 * @Description  : widget 组件入口文件
 */

import { FC } from 'react';
import QuestionInputConfig, { QuestionTextAreaConfig } from './QuestionInput';
import { QuestionInputProps } from './QuestionInput/interface';
import {
  QuestionTitleConfig,
  QuestionTitleLevel1Config,
  QuestionTitleLevel2Config,
  QuestionTitleLevel3Config
} from './QuestionTitle';
import { QuestionTitleProps } from './QuestionTitle/interface';
import { QuestionParagraphProps } from './QuestionParagraph/interface';
import { QuestionParagraphConfig } from './QuestionParagraph';
import _ from 'lodash';

export type WidgetType = 'title1' | 'title2' | 'title3' | 'input';

export type WidgetBaseType =
  | 'title'
  | 'paragraph'
  | 'input'
  | 'radio'
  | 'checkbox'
  | 'select';

export type WidgetProps = QuestionTitleProps &
  QuestionInputProps &
  QuestionParagraphProps;

export interface WidgetInfo {
  fe_id: string;
  baseType: WidgetBaseType;
  title: string;
  isHidden: boolean;
  isLocked: boolean;
  props: WidgetProps;
}

export interface WidgetConfig {
  /** 组件中文名 */
  name: string;
  baseType: WidgetBaseType;
  iconKey: string;
  Component: FC<WidgetProps>;
  AttributeConfig: FC<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (value: any) => void;
    disabled?: boolean;
  }>;
  defaultProps: WidgetProps;
}

/** 基本类型配置 */
export const widgetBaseConfigList: WidgetConfig[] = [
  QuestionTitleConfig,
  QuestionInputConfig,
  QuestionParagraphConfig
];

/** 根据组件类型获取组件基本类型的config */
export const getConfigByBaseType = (baseType: WidgetBaseType) => {
  return widgetBaseConfigList.find((item) => item.baseType === baseType);
};

/** 根据组件类型获取组件的config */
export const getLibConfigByName = (name: string) => {
  return widgetConfigList.find((item) => item.name === name);
};

export type WidgetLibCategory = 'text' | 'input';

/** 组件库信息 */
export interface WidgetLibGroup {
  key: WidgetLibCategory;
  title: string;
  components: WidgetConfig[];
}

/** 组件库分组对象 */
export const widgetLibGroup: WidgetLibGroup[] = [
  {
    key: 'text',
    title: '文本显示',
    components: [
      QuestionTitleLevel1Config,
      QuestionTitleLevel2Config,
      QuestionTitleLevel3Config,
      QuestionParagraphConfig
    ]
  },
  {
    key: 'input',
    title: '用户输入',
    components: [QuestionInputConfig, QuestionTextAreaConfig]
  }
];

/** 所有组件配置 */
export const widgetConfigList: WidgetConfig[] = _.reduce(
  widgetLibGroup,
  (prev, curr) => {
    return prev.concat(...curr.components);
  },
  [] as WidgetConfig[]
);
