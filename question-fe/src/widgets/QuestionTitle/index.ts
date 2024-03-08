import { WidgetConfig } from '..';
import { QuestionTitle } from './Component.tsx';
import { questionTitleDefaultProps } from './interface.ts';

export const QuestionTitleConfig: WidgetConfig = {
  title: '标题',
  type: 'title',
  Component: QuestionTitle,
  defaultProps: questionTitleDefaultProps
};
