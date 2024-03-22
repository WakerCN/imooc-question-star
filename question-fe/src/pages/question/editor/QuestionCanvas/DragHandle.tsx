/*
 * @Author       : 魏威
 * @Date         : 2024-03-22 16:04
 * @LastEditTime : 2024-03-22 17:54
 * @LastEditors  : Waker
 * @Description  :
 */
import { HBIcon } from '@/components/HBIcon';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

interface DragHandleProps {
  hoverElement: HTMLElement;
  isHover: boolean;
}

export const DragHandle: React.FC<DragHandleProps> = (props) => {
  const { hoverElement, isHover } = props;
  const { left, top } = hoverElement.getBoundingClientRect();
  const ref = useRef(null);

  return ReactDOM.createPortal(
    <div
      ref={ref}
      className={styles['drag-handle-wrap']}
      style={{
        left: left + 10,
        top: top + 10,
        display: isHover ? 'block' : 'none'
      }}
    >
      rate
      <HBIcon iconKey="rate" />
    </div>,
    document.body
  );
};
