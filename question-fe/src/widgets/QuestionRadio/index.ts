/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 14:37
 * @LastEditTime : 2024-03-14 17:30
 * @LastEditors  : Waker
 * @Description  :
 */
import { WidgetConfig } from '..';
import { AttributeConfig } from './AttributeConfig';
import QuestionRadio from './Component';
import { questionRadioDefaultProps } from './interface';

export const QuestionRadioConfig: WidgetConfig = {
  name: '单选',
  baseType: 'radio',
  iconKey: 'lib-radio',
  Component: QuestionRadio,
  AttributeConfig,
  defaultProps: questionRadioDefaultProps
};

export default QuestionRadioConfig;
