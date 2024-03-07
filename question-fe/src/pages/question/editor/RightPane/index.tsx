import { Tabs, TabsProps } from 'antd';
import styles from './index.module.scss';

import React from 'react';
import { SettingOutlined, SnippetsOutlined } from '@ant-design/icons';

interface Props {}

export const RightPane: React.FC<Props> = (props) => {
  console.log('RightPane props: ', props);

  const items: TabsProps['items'] = [
    {
      key: 'widget',
      label: (
        <>
          <SettingOutlined style={{ marginInlineEnd: 6 }} />
          <span>全局设置</span>
        </>
      ),
      children: <div>全局设置</div>
    },
    {
      key: 'layout',
      label: (
        <>
          <SnippetsOutlined style={{ marginInlineEnd: 6 }} />
          <span>属性</span>
        </>
      ),
      children: <div>属性</div>
    }
  ];

  return (
    <div className={styles['right-pane']}>
      <Tabs items={items} size="small" />
    </div>
  );
};
