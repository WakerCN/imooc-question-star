/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 17:53
 * @LastEditTime : 2024-03-11 10:07
 * @LastEditors  : Waker
 * @Description  :
 */
import { HBTabs } from '@/components/HBTabs';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { TabsProps } from 'antd';
import React from 'react';
import { WidgetLibPane } from './WidgetLibPane';
import styles from './index.module.scss';

interface Props {}

export const LeftPane: React.FC<Props> = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const items: TabsProps['items'] = [
    {
      key: 'widget',
      label: (
        <>
          <AppstoreOutlined style={{ marginInlineEnd: 6 }} />
          <span>组件</span>
        </>
      ),
      children: <WidgetLibPane />
    },
    {
      key: 'layout',
      label: (
        <>
          <BarsOutlined style={{ marginInlineEnd: 6 }} />
          <span>图层</span>
        </>
      ),
      children: <div>图层</div>
    }
  ];

  return (
    <div className={styles['left-pane']} ref={parentRef}>
      <HBTabs items={items} parentref={parentRef} />
    </div>
  );
};
