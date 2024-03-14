/*
 * @Author       : 魏威
 * @Date         : 2024-03-13 15:41
 * @LastEditTime : 2024-03-13 17:34
 * @LastEditors  : Waker
 * @Description  :
 */
import { WidgetConfig } from '..';
import { AttributeConfig } from './AttributeConfig';
import { QuestionParagraph } from './Component';
import { QuestionParagraphProps } from './interface';

export const defaultProps: QuestionParagraphProps = {
  text: '这是一个段落\n这是一个段落\n这是一个段落',
  isCenter: false
};

export const QuestionParagraphConfig: WidgetConfig = {
  name: '段落',
  baseType: 'paragraph',
  iconKey: 'lib-paragraph',
  Component: QuestionParagraph,
  defaultProps,
  AttributeConfig
};
