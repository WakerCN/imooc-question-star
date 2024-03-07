import React from 'react';
import styles from './index.module.scss';
import { Tabs, TabsProps } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

interface Props {}

export const LeftPane: React.FC<Props> = () => {
  const items: TabsProps['items'] = [
    {
      key: 'widget',
      label: (
        <>
          <AppstoreOutlined style={{ marginInlineEnd: 6 }} />
          <span>组件</span>
        </>
      ),
      children: <div>组件</div>
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
    <div className={styles['left-pane']}>
      <Tabs items={items} size="small" />
    </div>
  );
};
