/*
 * @Author       : 魏威
 * @Date         : 2024-03-08 13:41
 * @LastEditTime : 2024-03-13 15:19
 * @LastEditors  : Waker
 * @Description  :
 */
import { HBCollapse } from '@/components/HBCollapse';
import { widgetLibGroup } from '@/widgets';
import { Col, CollapseProps, Row } from 'antd';
import React from 'react';
import { WidgetItem } from './WidgetItem';

interface Props {}

export const WidgetLibPane: React.FC<Props> = () => {
  const items: CollapseProps['items'] = widgetLibGroup.map((group) => ({
    key: group.key,
    label: group.title,
    children: (
      <Row gutter={6} style={{ marginTop: 8, rowGap: 6 }}>
        {group.components.map((comp) => {
          return (
            <Col span={12} key={comp.name}>
              <WidgetItem data={comp} />
            </Col>
          );
        })}
      </Row>
    )
  }));

  return (
    <HBCollapse
      bordered={false}
      style={{ background: 'transparent' }}
      size="small"
      items={items}
    />
  );
};
