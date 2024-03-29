/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 10:23
 * @LastEditTime : 2024-03-13 15:29
 * @LastEditors  : Waker
 * @Description  :
 */
export interface QuestionInputProps {
  title?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

export const questionInputDefaultProps: QuestionInputProps = {
  title: '标题',
  placeholder: '请输入内容'
};
