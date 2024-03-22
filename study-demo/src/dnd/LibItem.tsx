/*
 * @Author       : 魏威
 * @Date         : 2024-03-20 15:04
 * @LastEditTime : 2024-03-21 17:53
 * @LastEditors  : Waker
 * @Description  :
 */
import React from 'react';
import { Dragable } from './Dragable';
import { LibBaseItem } from './LibBaseItem';

interface Props {
  info: { name: string };
}

export const DragItem: React.FC<Props> = (props: Props) => {
  const { info } = props;
  const { name } = info;

  return (
    <Dragable id={name}>
      <LibBaseItem info={info} />
    </Dragable>
  );
};
