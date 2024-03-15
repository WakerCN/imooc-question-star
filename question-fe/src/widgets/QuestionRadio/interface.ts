/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 10:23
 * @LastEditTime : 2024-03-14 17:09
 * @LastEditors  : Waker
 * @Description  :
 */
interface QuestionRadioListItem {
  label: string;
  value: string;
}

export interface QuestionRadioProps {
  title?: string;
  list?: QuestionRadioListItem[];
  defaultValue?: string;
  isVertical?: boolean;
}

export const questionRadioDefaultProps: QuestionRadioProps = {
  title: '标题',
  list: [
    { label: '选项1', value: '选项1' },
    { label: '选项2', value: '选项2' },
    { label: '选项3', value: '选项3' }
  ],
  defaultValue: undefined,
  isVertical: false
};
