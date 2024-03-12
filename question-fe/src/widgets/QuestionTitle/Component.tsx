/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 17:08
 * @LastEditTime : 2024-03-12 15:45
 * @LastEditors  : Waker
 * @Description  : QuestionTitle 组件
 */
import { Typography } from 'antd';
import { QuestionTitleProps, questionTitleDefaultProps } from './interface';

export const QuestionTitle: React.FC<QuestionTitleProps> = (props) => {
  const { title, level, alignCenter } = {
    ...questionTitleDefaultProps,
    ...props
  };

  return (
    <Typography.Title
      level={level}
      style={{ textAlign: alignCenter ? 'center' : 'left', margin: 0 }}
    >
      {title || '标题'}
    </Typography.Title>
  );
};
