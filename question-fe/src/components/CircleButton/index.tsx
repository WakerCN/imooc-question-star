import { Button, Tooltip } from 'antd';
import React from 'react';

interface Props extends React.ComponentProps<typeof Button> {
  title?: string;
}

export const CircleButton: React.FC<Props> = (props) => {
  const { title, ...buttonProps } = props;

  return title ? (
    <Tooltip title={title}>
      <Button shape="circle" {...buttonProps} />
    </Tooltip>
  ) : (
    <Button shape="circle" {...buttonProps} />
  );
};
