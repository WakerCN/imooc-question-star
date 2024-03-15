/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 14:37
 * @LastEditTime : 2024-03-14 17:26
 * @LastEditors  : Waker
 * @Description  :
 */
import { WidgetConfig } from '..';
import { AttributeConfig } from './AttributeConfig';
import QuestionInput from './Component';
import { questionInputDefaultProps } from './interface';

export const QuestionInputConfig: WidgetConfig = {
  name: '单行输入',
  baseType: 'input',
  iconKey: 'lib-input',
  Component: QuestionInput,
  AttributeConfig,
  defaultProps: questionInputDefaultProps
};

export const QuestionTextAreaConfig: WidgetConfig = {
  ...QuestionInputConfig,
  name: '多行输入',
  iconKey: 'lib-textarea',
  defaultProps: {
    ...questionInputDefaultProps,
    isTextArea: true
  }
};

export default QuestionInputConfig;
