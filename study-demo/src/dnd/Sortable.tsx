/*
 * @Author       : 魏威
 * @Date         : 2024-03-21 09:31
 * @LastEditTime : 2024-03-21 10:20
 * @LastEditors  : Waker
 * @Description  :
 */
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

interface SortableProps extends React.PropsWithChildren {
  id: string;
  element?: 'div' | 'span';
}

export const Sortable: React.FC<SortableProps> = (props) => {
  const { id, element = 'div', children } = props;
  const Element = element;

  const sortableProps = useSortable({ id, data: { type: 'widget' } });

  const { setNodeRef, listeners, attributes } = sortableProps;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDecoratedChildren = (children: any) => {
    return React.Children.map(children, (child) =>
      React.cloneElement(child, { sortableProps })
    );
  };

  return (
    <Element ref={setNodeRef} {...listeners} {...attributes}>
      {getDecoratedChildren(children)}
    </Element>
  );
};
