/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 17:13
 * @LastEditTime : 2024-03-15 10:18
 * @LastEditors  : Waker
 * @Description  :
 */

import { Checkbox, Flex, Radio, Typography } from 'antd';
import { QuestionCheckBoxProps, questionRadioDefaultProps } from './interface';

export const QuestionRadio: React.FC<QuestionCheckBoxProps> = (props) => {
  const {
    title,
    list = [],
    isVertical
  } = {
    ...questionRadioDefaultProps,
    ...props
  };

  return (
    <>
      <div>
        <Typography.Text strong>{title}</Typography.Text>
      </div>
      <Radio.Group>
        <Flex vertical={isVertical} wrap={'wrap'} gap={10}>
          {list.map((i) => (
            <Checkbox key={i.value} checked={i.checked}>
              {i.label}
            </Checkbox>
          ))}
        </Flex>
      </Radio.Group>
    </>
  );
};

export default QuestionRadio;
