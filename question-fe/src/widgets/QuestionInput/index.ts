/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 14:37
 * @LastEditTime : 2024-03-11 16:49
 * @LastEditors  : Waker
 * @Description  :
 */
import { WidgetConfig } from '..';
import QuestionInput from './Component';
import { questionInputDefaultProps } from './interface';
import { AttributeConfig } from './AttributeConfig';

export const QuestionInputConfig: WidgetConfig = {
  name: '文本',
  baseType: 'input',
  Component: QuestionInput,
  AttributeConfig,
  defaultProps: questionInputDefaultProps
};

export default QuestionInputConfig;
