/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 17:08
 * @LastEditTime : 2024-03-07 17:11
 * @LastEditors  : Waker
 * @Description  : QuestionTitle 组件
 */
import { Typography } from 'antd';
import { QuestionTitleProps, questionTitleDefaultProps } from './interface';

export const QuestionTitle: React.FC<QuestionTitleProps> = (props) => {
  const { title, level, align } = { ...questionTitleDefaultProps, ...props };

  return (
    <Typography.Title
      level={level}
      style={{ textAlign: align, marginBottom: 0 }}
    >
      {title}
    </Typography.Title>
  );
};
