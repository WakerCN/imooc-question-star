/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 10:23
 * @LastEditTime : 2024-03-14 17:09
 * @LastEditors  : Waker
 * @Description  :
 */
interface QuestionCheckBoxListItem {
  label: string;
  value: string;
  checked: boolean;
}

export interface QuestionCheckBoxProps {
  title?: string;
  list?: QuestionCheckBoxListItem[];
  isVertical?: boolean;
}

export const questionRadioDefaultProps: QuestionCheckBoxProps = {
  title: '标题',
  list: [
    { label: '选项1', value: '选项1', checked: true },
    { label: '选项2', value: '选项2', checked: true },
    { label: '选项3', value: '选项3', checked: false }
  ],
  isVertical: false
};
