/*
 * @Author       : 魏威
 * @Date         : 2024-03-21 09:45
 * @LastEditTime : 2024-03-21 16:16
 * @LastEditors  : Waker
 * @Description  : 组件item
 */

import React from 'react';
import { Sortable } from './Sortable';
import { WidgetBaseItem } from './WidgetBaseItem';

interface WidgetItemProps {
  info: {
    id: string;
    type: string;
  };
}

export const WidgetItem: React.FC<WidgetItemProps> = (props) => {
  const { info } = props;
  const { id } = info;

  return (
    <Sortable id={id}>
      <WidgetBaseItem info={info} />
    </Sortable>
  );
};
