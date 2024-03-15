/*
 * @Author       : 魏威
 * @Date         : 2024-03-07 17:13
 * @LastEditTime : 2024-03-15 09:43
 * @LastEditors  : Waker
 * @Description  :
 */

import { Flex, Radio, Typography } from 'antd';
import { QuestionRadioProps, questionRadioDefaultProps } from './interface';

export const QuestionRadio: React.FC<QuestionRadioProps> = (props) => {
  const {
    title,
    list = [],
    defaultValue,
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
      <Radio.Group value={defaultValue}>
        <Flex vertical={isVertical} wrap={'wrap'}>
          {list.map((i) => (
            <Radio key={i.value} value={i.value}>
              {i.label}
            </Radio>
          ))}
        </Flex>
      </Radio.Group>
    </>
  );
};

export default QuestionRadio;
