/*
 * @Author       : 魏威
 * @Date         : 2024-03-21 16:04
 * @LastEditTime : 2024-03-22 09:27
 * @LastEditors  : Waker
 * @Description  :
 */
import { useDraggable } from '@dnd-kit/core';
import React from 'react';

interface Props extends React.PropsWithChildren {
  id: string;
}

export const Dragable: React.FC<Props> = (props) => {
  const { id, children } = props;
  const draggableProps = useDraggable({ id, data: { type: 'lib' } });
  const { setNodeRef, attributes, listeners } = draggableProps;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDecoratedChildren = (children: any) => {
    return React.Children.map(children, (child) =>
      React.cloneElement(child, { draggableProps })
    );
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {getDecoratedChildren(children)}
    </div>
  );
};
