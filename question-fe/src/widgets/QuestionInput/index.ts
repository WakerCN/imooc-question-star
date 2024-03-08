/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 14:37
 * @LastEditTime : 2024-03-08 10:54
 * @LastEditors  : Waker
 * @Description  :
 */
import { WidgetConfig } from '..';
import QuestionInput from './Component';
import { questionInputDefaultProps } from './interface';

export const QuestionInputConfig: WidgetConfig = {
  title: '标题',
  type: 'input',
  Component: QuestionInput,
  defaultProps: questionInputDefaultProps
};

export default QuestionInputConfig;
