/*
 * @Author       : 魏威
 * @Date         : 2024-03-06 17:51
 * @LastEditTime : 2024-03-11 15:32
 * @LastEditors  : Waker
 * @Description  :
 */
import { TabsProps } from 'antd';
import styles from './index.module.scss';

import { HBTabs } from '@/components/HBTabs';
import { useGetQuestionDetail } from '@/hooks/question';
import { useAppDispatch } from '@/hooks/redux';
import { questionSlice } from '@/stores/question';
import { SettingOutlined, SnippetsOutlined } from '@ant-design/icons';
import React from 'react';
import { AttributePane } from './AttributePane';

interface Props {}

export const RightPane: React.FC<Props> = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { rightPaneActiveKey, selectedId } = useGetQuestionDetail();
  const { setRightPaneActiveKey } = questionSlice.actions;

  const items: TabsProps['items'] = [
    {
      key: 'settings',
      label: (
        <>
          <SettingOutlined style={{ marginInlineEnd: 6 }} />
          <span>全局设置</span>
        </>
      ),
      children: <div>全局设置</div>
    },
    {
      key: 'attributes',
      disabled: !selectedId,
      label: (
        <>
          <SnippetsOutlined style={{ marginInlineEnd: 6 }} />
          <span>属性</span>
        </>
      ),
      children: <AttributePane />
    }
  ];

  const handleTabsChange: TabsProps['onChange'] = (activeKey) => {
    dispatch(setRightPaneActiveKey(activeKey));
  };

  return (
    <div className={styles['right-pane']} ref={parentRef}>
      <HBTabs
        items={items}
        size="small"
        parentref={parentRef}
        activeKey={rightPaneActiveKey}
        onChange={handleTabsChange}
      />
    </div>
  );
};
