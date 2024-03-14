/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 17:13
 * @LastEditTime : 2024-03-08 10:10
 * @LastEditors  : Waker
 * @Description  :
 */

import { Input, Typography } from 'antd';
import { QuestionInputProps, questionInputDefaultProps } from './interface';

export const QuestionInput: React.FC<QuestionInputProps> = (props) => {
  const { title, placeholder, isTextArea } = {
    ...questionInputDefaultProps,
    ...props
  };

  return (
    <div>
      <div>
        <Typography.Text strong>{title}</Typography.Text>
      </div>
      <div>
        {isTextArea ? (
          <Input.TextArea placeholder={placeholder} />
        ) : (
          <Input placeholder={placeholder} />
        )}
      </div>
    </div>
  );
};

export default QuestionInput;
