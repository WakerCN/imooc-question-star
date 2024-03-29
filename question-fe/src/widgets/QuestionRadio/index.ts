/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 14:37
 * @LastEditTime : 2024-03-15 10:31
 * @LastEditors  : Waker
 * @Description  :
 */
import { FC } from 'react';
import { WidgetConfig, WidgetProps } from '..';
import { AttributeConfig } from './AttributeConfig';
import QuestionRadio from './Component';
import { questionRadioDefaultProps } from './interface';

export const QuestionRadioConfig: WidgetConfig = {
  name: '单选',
  baseType: 'radio',
  iconKey: 'lib-radio',
  Component: QuestionRadio as FC<WidgetProps>,
  AttributeConfig,
  defaultProps: questionRadioDefaultProps
};

export default QuestionRadioConfig;
