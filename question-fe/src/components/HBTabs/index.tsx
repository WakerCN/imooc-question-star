/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 16:12
 * @LastEditTime : 2024-03-08 16:31
 * @LastEditors  : Waker
 * @Description  :
 */
import { useSize } from 'ahooks';
import { Tabs, TabsProps } from 'antd';
import React from 'react';

interface HBTabsProps extends React.ComponentProps<typeof Tabs> {
  parentref: React.RefObject<HTMLElement>;
}

export const HBTabs: React.FC<HBTabsProps> = (props) => {
  const { items, parentref: parentRef } = props;

  const parentDomSize = useSize(parentRef);

  const tabNacHeight = 38;
  const tabNavMarginBottom = 16;

  const tabsPaneStyle: React.CSSProperties = {
    height: parentDomSize?.height
      ? parentDomSize.height - tabNacHeight - tabNavMarginBottom - 10
      : 'auto',
    overflow: 'auto'
  };

  const newItems = items?.map((item) => {
    return {
      ...item,
      style: tabsPaneStyle
    };
  });

  const newProps: TabsProps = {
    ...props,
    items: newItems,
    size: 'small',
    animated: {
      inkBar: true,
      tabPane: false
    }
  };

  return <Tabs {...newProps} />;
};
