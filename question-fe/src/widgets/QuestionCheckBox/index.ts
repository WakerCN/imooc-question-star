/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 14:37
 * @LastEditTime : 2024-03-15 10:33
 * @LastEditors  : Waker
 * @Description  :
 */
import { FC } from 'react';
import { WidgetConfig, WidgetProps } from '..';
import { AttributeConfig } from './AttributeConfig';
import QuestionRadio from './Component';
import { questionRadioDefaultProps } from './interface';

export const QuestionCheckBoxConfig: WidgetConfig = {
  name: '多选',
  baseType: 'checkbox',
  iconKey: 'checkbox',
  Component: QuestionRadio as FC<WidgetProps>,
  AttributeConfig,
  defaultProps: questionRadioDefaultProps
};

export default QuestionCheckBoxConfig;
