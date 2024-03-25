/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 16:32
 * @LastEditTime : 2024-03-25 10:54
 * @LastEditors  : Waker
 * @Description  : widget 组件入口文件
 */

import _ from 'lodash';
import { FC } from 'react';
import QuestionInputConfig, { QuestionTextAreaConfig } from './QuestionInput';
import { QuestionInputProps } from './QuestionInput/interface';
import { QuestionParagraphConfig } from './QuestionParagraph';
import { QuestionParagraphProps } from './QuestionParagraph/interface';
import QuestionRadioConfig from './QuestionRadio';
import {
  QuestionTitleConfig,
  QuestionTitleLevel1Config,
  QuestionTitleLevel2Config,
  QuestionTitleLevel3Config
} from './QuestionTitle';
import { QuestionTitleProps } from './QuestionTitle/interface';
import QuestionCheckBoxConfig from './QuestionCheckBox';
import { QuestionRadioProps } from './QuestionRadio/interface';
import { QuestionCheckBoxProps } from './QuestionCheckBox/interface';
import { HBIconKey } from '@/components/HBIcon';

export type WidgetType = 'title1' | 'title2' | 'title3' | 'input';

export type WidgetBaseType =
  | 'title'
  | 'paragraph'
  | 'input'
  | 'radio'
  | 'checkbox'
  | 'select';

export type WidgetProps =
  | QuestionTitleProps
  | QuestionInputProps
  | QuestionParagraphProps
  | QuestionRadioProps
  | QuestionCheckBoxProps;

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
  QuestionParagraphConfig,
  QuestionRadioConfig,
  QuestionCheckBoxConfig
];

/** 根据组件类型获取组件基本类型的config */
export const getConfigByBaseType = (baseType: WidgetBaseType) => {
  return widgetBaseConfigList.find((item) => item.baseType === baseType);
};

/** 根据组件类型获取组件的config */
export const getLibConfigByName = (name: string) => {
  return widgetConfigList.find((item) => item.name === name);
};

export type WidgetLibCategory = 'text' | 'input' | 'select';

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
  },
  {
    key: 'select',
    title: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckBoxConfig]
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

/** 根据basetype 获取对应iconKey */
export const getBaseTypeIconKey = (baseType: WidgetBaseType): HBIconKey => {
  return ({
    title: 'baseType-title',
    paragraph: 'lib-paragraph',
    input: 'lib-input',
    radio: 'lib-radio',
    select: 'baseType-select',
    checkbox: 'checkbox'
  }?.[baseType] || 'baseType-title') as HBIconKey;
};
