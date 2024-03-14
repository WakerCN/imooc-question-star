import { Typography } from 'antd';
import React from 'react';
import { defaultProps } from '.';
import { QuestionParagraphProps } from './interface';

export const QuestionParagraph: React.FC<QuestionParagraphProps> = (props) => {
  const { text, isCenter } = { ...defaultProps, ...props };

  const textStyle: React.CSSProperties | undefined = isCenter
    ? { textAlign: 'center' }
    : undefined;

  const _text = text?.split('\n')?.map((line, index) => (
    <div style={textStyle} key={index}>
      {line}
    </div>
  ));

  return (
    <Typography.Paragraph style={{ margin: 0 }}>
      {text ? _text : <div style={textStyle}>请填入段落内容</div>}
    </Typography.Paragraph>
  );
};
