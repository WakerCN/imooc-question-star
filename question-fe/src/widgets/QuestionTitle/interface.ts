/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 10:26
 * @LastEditTime : 2024-03-12 10:49
 * @LastEditors  : Waker
 * @Description  :
 */

export interface QuestionTitleProps {
  title?: string;
  level?: 1 | 2 | 3;
  alignCenter?: boolean;
}

export const questionTitleDefaultProps: QuestionTitleProps = {
  title: '一级标题',
  level: 1,
  alignCenter: false
};
