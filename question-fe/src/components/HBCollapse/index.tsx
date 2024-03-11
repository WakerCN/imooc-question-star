/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 15:55
 * @LastEditTime : 2024-03-08 17:02
 * @LastEditors  : Waker
 * @Description  :
 */
import { Collapse, CollapseProps, theme } from 'antd';
import React from 'react';
import styles from './index.module.scss';
import { CaretRightOutlined } from '@ant-design/icons';

interface HBCollapseProps extends React.ComponentProps<typeof Collapse> {}

export const HBCollapse: React.FC<HBCollapseProps> = (props) => {
  const { items } = props;

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 10,
    borderRadius: token.borderRadiusLG,
    border: 'none'
  };

  const commonProps = {
    style: panelStyle,
    headerClass: styles['custom-collapse-header'],
    className: styles['custom-collapse']
  };

  const addStyleToEachItem = (
    items: CollapseProps['items']
  ): CollapseProps['items'] => {
    return items?.map((item) => ({
      ...item,
      ...commonProps
    }));
  };

  const newItems = addStyleToEachItem(items);

  const newProps: CollapseProps = {
    ...props,
    items: newItems,
    expandIcon: ({ isActive }) => (
      <CaretRightOutlined rotate={isActive ? 90 : 0} />
    ),
    defaultActiveKey: (newItems?.map((item) => item.key) as string[]) || []
  };

  return <Collapse {...newProps} />;
};
